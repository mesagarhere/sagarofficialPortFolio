import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';
import { Rotate3d, Play, Pause, Compass, Sparkles, Layers, Info } from 'lucide-react';

interface SkillNode {
  name: string;
  category: string;
  color: number;
  size: number;
  distance: number;
  speed: number;
  angle: number;
  tools: string[];
}

const SKILL_NODES_DATA: SkillNode[] = [
  {
    name: 'Python',
    category: 'Development',
    color: 0x3b82f6,
    size: 0.28,
    distance: 1.8,
    speed: 0.8,
    angle: 0,
    tools: ['Data Scripts', 'Automation', 'APIs']
  },
  {
    name: 'Web Dev',
    category: 'Development',
    color: 0x06b6d4,
    size: 0.26,
    distance: 2.3,
    speed: 0.6,
    angle: (Math.PI * 2) / 7,
    tools: ['React', 'TypeScript', 'Tailwind']
  },
  {
    name: 'AI Video',
    category: 'AI Creative',
    color: 0xa855f7,
    size: 0.3,
    distance: 2.8,
    speed: 0.45,
    angle: (Math.PI * 4) / 7,
    tools: ['Luma Dream Machine', 'Runway Gen-3', 'Kling AI']
  },
  {
    name: 'Video Editing',
    category: 'Content',
    color: 0xf59e0b,
    size: 0.27,
    distance: 3.2,
    speed: 0.38,
    angle: (Math.PI * 6) / 7,
    tools: ['CapCut Pro', 'DaVinci Resolve', 'Premiere']
  },
  {
    name: 'Posters & Art',
    category: 'Design',
    color: 0xec4899,
    size: 0.24,
    distance: 3.6,
    speed: 0.3,
    angle: (Math.PI * 8) / 7,
    tools: ['Canva Pro', 'Photoshop', 'Typography']
  },
  {
    name: 'Thumbnails',
    category: 'Content',
    color: 0xef4444,
    size: 0.26,
    distance: 4.0,
    speed: 0.25,
    angle: (Math.PI * 10) / 7,
    tools: ['High CTR', 'Visual Hierarchy', 'Color Grading']
  },
  {
    name: 'AI Prompts',
    category: 'AI Creative',
    color: 0x10b981,
    size: 0.25,
    distance: 4.4,
    speed: 0.2,
    angle: (Math.PI * 12) / 7,
    tools: ['Midjourney v6', 'Claude 3.7', 'Gemini']
  }
];

export const ThreeSkillGalaxy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePortfolio();
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(SKILL_NODES_DATA[0]);
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(6.5);
  const isRotatingRef = useRef(true);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, zoomLevel);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. Central Core: Sagar's Multidisciplinary Sun
    const sunGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const sunMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x3b82f6 : 0x2563eb,
      emissive: theme === 'dark' ? 0x1d4ed8 : 0x60a5fa,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    rootGroup.add(sunMesh);

    // Inner glowing sphere
    const innerSunGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const innerSunMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x60a5fa : 0x3b82f6
    });
    const innerSunMesh = new THREE.Mesh(innerSunGeo, innerSunMat);
    rootGroup.add(innerSunMesh);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 2, 20);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 4. Orbital Rings & Planet Meshes
    const planetMeshes: { mesh: THREE.Mesh; data: SkillNode; ring: THREE.Line }[] = [];

    SKILL_NODES_DATA.forEach((node) => {
      // Orbit Path Line
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        node.distance, node.distance,
        0, 2 * Math.PI,
        false, 0
      );
      const points = orbitCurve.getPoints(80);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const ringMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: theme === 'dark' ? 0.25 : 0.4
      });
      const orbitRing = new THREE.Line(ringGeo, ringMat);
      rootGroup.add(orbitRing);

      // Planet Mesh
      const planetGeo = new THREE.SphereGeometry(node.size, 24, 24);
      const planetMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.6
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.userData = { skillData: node };

      // Micro Atmosphere Ring
      const atmoRingGeo = new THREE.TorusGeometry(node.size * 1.5, 0.015, 8, 32);
      const atmoRingMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.6
      });
      const atmoRing = new THREE.Mesh(atmoRingGeo, atmoRingMat);
      atmoRing.rotation.x = Math.PI / 2.5;
      planetMesh.add(atmoRing);

      rootGroup.add(planetMesh);
      planetMeshes.push({ mesh: planetMesh, data: node, ring: orbitRing });
    });

    // 5. Cosmic Dust Cloud
    const dustCount = 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const radius = 1.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 1.8;
      dustPositions[i * 3] = radius * Math.cos(theta);
      dustPositions[i * 3 + 1] = phi;
      dustPositions[i * 3 + 2] = radius * Math.sin(theta);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: theme === 'dark' ? 0x93c5fd : 0x3b82f6,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    rootGroup.add(dustParticles);

    // 6. Raycasting for Click / Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh));

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        if (clickedMesh.userData.skillData) {
          setActiveSkill(clickedMesh.userData.skillData as SkillNode);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Support
    let prevTouchX = 0;
    let prevTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevTouchX;
        const deltaY = e.touches[0].clientY - prevTouchY;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.005;
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: true });

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Spin central sun
      sunMesh.rotation.y += 0.008;
      sunMesh.rotation.x += 0.004;

      // Spin particles
      dustParticles.rotation.y = elapsedTime * 0.02;

      // Orbit planets
      planetMeshes.forEach((item) => {
        if (isRotatingRef.current) {
          const currentAngle = item.data.angle + elapsedTime * item.data.speed * 0.5;
          item.mesh.position.x = Math.cos(currentAngle) * item.data.distance;
          item.mesh.position.z = Math.sin(currentAngle) * item.data.distance;
        }
        item.mesh.rotation.y += 0.02;
      });

      // Subtle base rotation if not dragging
      if (!isDragging && isRotatingRef.current) {
        rootGroup.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sunGeo.dispose();
      sunMat.dispose();
      innerSunGeo.dispose();
      innerSunMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      planetMeshes.forEach(p => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach(m => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [theme]);

  // Adjust zoom
  const handleZoom = (delta: number) => {
    if (cameraRef.current) {
      const newZ = Math.min(Math.max(cameraRef.current.position.z + delta, 4.0), 9.0);
      cameraRef.current.position.z = newZ;
      setZoomLevel(newZ);
    }
  };

  return (
    <div className="relative w-full rounded-3xl p-4 sm:p-6 glass-panel border border-white/20 shadow-2xl overflow-hidden my-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center glass-panel text-blue-400">
            <Rotate3d className="w-4 h-4 text-blue-400 animate-spin-slow" />
          </div>
          <div>
            <h3 className={`text-base font-bold flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              <span>Interactive 3D Skill Planetarium</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Live 3D WebGL
              </span>
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Drag to freely rotate in 3D • Click any planet to inspect stack
            </p>
          </div>
        </div>

        {/* 3D Action Controls */}
        <div className="flex items-center gap-1.5 glass-panel p-1 rounded-full border border-white/15">
          <button
            type="button"
            onClick={() => setIsRotating(prev => !prev)}
            title={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
            }`}
          >
            {isRotating ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => handleZoom(-0.8)}
            title="Zoom In"
            className={`px-2 py-1 text-xs font-mono font-bold rounded-full transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
            }`}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => handleZoom(0.8)}
            title="Zoom Out"
            className={`px-2 py-1 text-xs font-mono font-bold rounded-full transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
            }`}
          >
            -
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        id="three-skill-galaxy-canvas"
        className="relative w-full h-[380px] sm:h-[460px] cursor-grab active:cursor-grabbing"
      >
        {/* Helper watermark hint */}
        <div className={`absolute top-3 left-3 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border text-[11px] ${
          theme === 'dark' ? 'border-white/10 text-neutral-400' : 'border-black/10 text-neutral-600'
        }`}>
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span>Full 3D Orbit • 360° Interaction</span>
        </div>
      </div>

      {/* Interactive Active Planet Drawer */}
      {activeSkill && (
        <div className={`relative mt-2 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-300 z-20 ${
          theme === 'dark'
            ? 'bg-white/[0.04] border-white/15'
            : 'bg-white/80 border-black/10 shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ backgroundColor: `#${activeSkill.color.toString(16).padStart(6, '0')}` }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{activeSkill.name}</span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-white/10 text-neutral-300' : 'bg-black/5 text-neutral-700'
                }`}>
                  {activeSkill.category}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Core stack & tools mastered by Sagar
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {activeSkill.tools.map((tool, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-medium glass-panel border ${
                  theme === 'dark' ? 'border-white/20 text-neutral-200' : 'border-black/10 text-neutral-800'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
