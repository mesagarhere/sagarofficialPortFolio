import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';

export const ThreeBackgroundField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePortfolio();

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3D FLOATING PARTICLES WITH DEPTH
    const count = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorBlue = new THREE.Color(theme === 'dark' ? 0x60a5fa : 0x3b82f6);
    const colorTeal = new THREE.Color(theme === 'dark' ? 0x34d399 : 0x059669);
    const colorPurple = new THREE.Color(theme === 'dark' ? 0xc084fc : 0x8b5cf6);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

      scales[i] = Math.random() * 3 + 1.5;

      const pick = i % 3;
      const col = pick === 0 ? colorBlue : pick === 1 ? colorTeal : colorPurple;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: theme === 'dark' ? 5.5 : 4.0,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.45 : 0.35,
      blending: theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // 3D FLOATING BACKGROUND GEOMETRIC SHAPES
    const shapeGroup = new THREE.Group();
    scene.add(shapeGroup);

    // 1. Floating Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(75, 1);
    const wireMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x3b82f6 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.12 : 0.08
    });
    const icoMesh = new THREE.Mesh(icoGeo, wireMat1);
    icoMesh.position.set(380, -120, -150);
    shapeGroup.add(icoMesh);

    // 2. Floating Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(55, 14, 64, 8);
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x8b5cf6 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.10 : 0.06
    });
    const torusMesh = new THREE.Mesh(torusGeo, wireMat2);
    torusMesh.position.set(-420, 180, -200);
    shapeGroup.add(torusMesh);

    // 3. Floating Octahedron
    const octaGeo = new THREE.OctahedronGeometry(60, 0);
    const wireMat3 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x10b981 : 0x059669,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.11 : 0.07
    });
    const octaMesh = new THREE.Mesh(octaGeo, wireMat3);
    octaMesh.position.set(220, 260, -180);
    shapeGroup.add(octaMesh);

    // MOUSE PARALLAX
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (document.hidden) return; // Pause when tab is not visible

      const time = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Slow 3D cosmic rotation & drift
      pointCloud.rotation.y = time * 0.025;
      pointCloud.rotation.x = Math.sin(time * 0.015) * 0.1;

      // 3D Polyhedrons rotation
      icoMesh.rotation.x = time * 0.15;
      icoMesh.rotation.y = time * 0.2;
      torusMesh.rotation.x = time * 0.12;
      torusMesh.rotation.z = time * 0.18;
      octaMesh.rotation.y = time * 0.25;
      octaMesh.rotation.z = time * 0.14;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      icoGeo.dispose();
      wireMat1.dispose();
      torusGeo.dispose();
      wireMat2.dispose();
      octaGeo.dispose();
      wireMat3.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      id="three-background-field"
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
    />
  );
};
