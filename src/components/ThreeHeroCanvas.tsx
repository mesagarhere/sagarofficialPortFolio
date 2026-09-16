import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';
import { Rotate3d, Sparkles, Eye, Move3d } from 'lucide-react';

interface ThreeHeroCanvasProps {
  className?: string;
  isInteractive?: boolean;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({
  className = '',
  isInteractive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePortfolio();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ROOT 3D GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. CORE: Geometric Wireframe Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x3b82f6 : 0x2563eb,
      emissive: theme === 'dark' ? 0x1d4ed8 : 0x60a5fa,
      emissiveIntensity: theme === 'dark' ? 0.35 : 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. INNER GLOWING NUCLEUS (Dodecahedron)
    const nucleusGeo = new THREE.DodecahedronGeometry(0.65, 0);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x10b981 : 0x059669,
      emissive: theme === 'dark' ? 0x059669 : 0x34d399,
      emissiveIntensity: 0.5,
      wireframe: false,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.85
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    mainGroup.add(nucleusMesh);

    // 3. ORBITAL RING 1 (Torus)
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x60a5fa : 0x3b82f6,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    // 4. ORBITAL RING 2 (Torus opposite inclination)
    const ring2Geo = new THREE.TorusGeometry(2.1, 0.018, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xa855f7 : 0x7c3aed,
      transparent: true,
      opacity: 0.6
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    mainGroup.add(ring2);

    // 5. ORBITAL RING 3 (Equatorial thin ring)
    const ring3Geo = new THREE.TorusGeometry(2.35, 0.012, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x2dd4bf : 0x0d9488,
      transparent: true,
      opacity: 0.5
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    mainGroup.add(ring3);

    // 6. FLOATING PARTICLES (Swarm of 3D tech nodes)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(theme === 'dark' ? 0x60a5fa : 0x2563eb);
    const color2 = new THREE.Color(theme === 'dark' ? 0x34d399 : 0x059669);
    const color3 = new THREE.Color(theme === 'dark' ? 0xc084fc : 0x9333ea);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical shell around the core
      const radius = 1.3 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const pickedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      particleColors[i * 3] = pickedColor.r;
      particleColors[i * 3 + 1] = pickedColor.g;
      particleColors[i * 3 + 2] = pickedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle sprite using canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 7. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2.5, 20);
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 2, 20);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    // INTERACTION / POINTER TRACKING
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isPointerDown) {
        const deltaX = (clientX - pointerStartX) * 0.01;
        const deltaY = (clientY - pointerStartY) * 0.01;
        targetRotationY += deltaX;
        targetRotationX += deltaY;
        pointerStartX = clientX;
        pointerStartY = clientY;
      } else {
        mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationX = mouseY * 0.6;
        targetRotationY = mouseX * 0.8;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerStartX = clientX;
      pointerStartY = clientY;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
    };

    if (isInteractive) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mouseup', handlePointerUp);
      container.addEventListener('touchmove', handlePointerMove, { passive: true });
      container.addEventListener('touchstart', handlePointerDown, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation towards target
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      mainGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.3) * 0.1;
      mainGroup.rotation.y = currentRotationY + elapsedTime * 0.2;

      // Rotate sub-elements independently for rich orbital depth
      coreMesh.rotation.x = elapsedTime * 0.4;
      coreMesh.rotation.y = elapsedTime * 0.3;

      nucleusMesh.rotation.x = -elapsedTime * 0.6;
      nucleusMesh.rotation.z = elapsedTime * 0.5;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.4;
      ring3.rotation.z = elapsedTime * 0.25;

      particles.rotation.y = -elapsedTime * 0.15;
      particles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      // Pulse nucleus breathing scale
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      nucleusMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (isInteractive) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mousedown', handlePointerDown);
        window.removeEventListener('mouseup', handlePointerUp);
        container.removeEventListener('touchmove', handlePointerMove);
        container.removeEventListener('touchstart', handlePointerDown);
        window.removeEventListener('touchend', handlePointerUp);
      }

      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, isInteractive]);

  return (
    <div
      ref={containerRef}
      id="three-hero-canvas-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* 3D Interaction Badge */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium glass-pill border border-white/20 text-neutral-300 pointer-events-none transition-opacity duration-300 ${
          isHovered || isDragging ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <Move3d className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span>{isDragging ? 'Rotating 3D Core' : 'Drag to Rotate 3D Core'}</span>
      </div>
    </div>
  );
};
