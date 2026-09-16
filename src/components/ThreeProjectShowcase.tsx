import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/portfolioData';
import { Rotate3d, ChevronLeft, ChevronRight, Eye, ExternalLink, Sparkles } from 'lucide-react';

interface ThreeProjectShowcaseProps {
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const ThreeProjectShowcase: React.FC<ThreeProjectShowcaseProps> = ({ onOpenCaseStudy }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, theme } = usePortfolio();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedIndexRef = useRef<number>(0);
  selectedIndexRef.current = selectedIndex;

  const projects = data.projects;
  const currentProject = projects[selectedIndex] || projects[0];

  const targetRotationRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || projects.length === 0) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Carousel Group
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    // Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 2.5, 30);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    const radius = Math.max(3.2, (projects.length * 0.9) / Math.PI);
    const cardMeshes: THREE.Mesh[] = [];

    // Helper: Generate dynamic canvas texture for each project card
    const createProjectCardTexture = (proj: ProjectItem) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 360;
      const ctx = c.getContext('2d');
      if (ctx) {
        // Dark Glassy Background
        const grad = ctx.createLinearGradient(0, 0, 0, 360);
        grad.addColorStop(0, '#131b2e');
        grad.addColorStop(1, '#0b0f19');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 360);

        // Border Glow
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, 504, 352);

        // Category Tag
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.roundRect(32, 28, 140, 36, 18);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(proj.category.slice(0, 16), 46, 52);

        // Project Title
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(proj.name.slice(0, 26), 32, 115);

        // Short Description
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px sans-serif';
        const words = proj.shortDescription.split(' ');
        let line = '';
        let y = 160;
        for (let w of words) {
          if (line.length + w.length > 32) {
            ctx.fillText(line, 32, y);
            line = w + ' ';
            y += 28;
            if (y > 230) break;
          } else {
            line += w + ' ';
          }
        }
        ctx.fillText(line, 32, y);

        // Problem & Outcome Pill
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.roundRect(32, 260, 448, 64, 12);
        ctx.fill();

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('Outcome:', 44, 298);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '15px sans-serif';
        ctx.fillText(proj.finalResult.slice(0, 34) + '...', 125, 298);
      }
      return new THREE.CanvasTexture(c);
    };

    // 3. Create 3D Cards arranged in a circular carousel
    const angleStep = (Math.PI * 2) / projects.length;

    projects.forEach((proj, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const cardGeo = new THREE.PlaneGeometry(2.4, 1.7);
      const texture = createProjectCardTexture(proj);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.6,
        side: THREE.DoubleSide
      });

      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set(x, 0, z);
      cardMesh.rotation.y = angle;
      cardMesh.userData = { index: i, project: proj };

      carouselGroup.add(cardMesh);
      cardMeshes.push(cardMesh);
    });

    // Raycaster for card clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const hitIdx = hit.userData.index;
        if (hitIdx !== undefined) {
          if (hitIdx === selectedIndexRef.current) {
            // Already active card clicked -> trigger case study
            onOpenCaseStudy(hit.userData.project);
          } else {
            // Rotate to this card
            setSelectedIndex(hitIdx);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Mouse drag support
    let isDragging = false;
    let startX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      targetRotationRef.current += deltaX * 0.005;
      startX = e.clientX;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      // Snap to nearest card
      const step = (Math.PI * 2) / projects.length;
      const nearestIdx = Math.round(-targetRotationRef.current / step);
      const normalizedIdx = ((nearestIdx % projects.length) + projects.length) % projects.length;
      setSelectedIndex(normalizedIdx);
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 4. Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth interpolation toward target rotation
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.08;
      carouselGroup.rotation.y = currentRotationRef.current;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Resize observer
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
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      cardMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [projects, theme]);

  // Sync selected index with rotation
  useEffect(() => {
    if (projects.length > 0) {
      const angleStep = (Math.PI * 2) / projects.length;
      targetRotationRef.current = -selectedIndex * angleStep;
    }
  }, [selectedIndex, projects.length]);

  const handlePrev = () => {
    setSelectedIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev + 1) % projects.length);
  };

  return (
    <div className="relative w-full rounded-3xl p-4 sm:p-6 glass-panel border border-white/20 shadow-2xl overflow-hidden my-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center glass-panel text-blue-400">
            <Rotate3d className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              <span>3D Spatial Project Carousel</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                Interactive 3D
              </span>
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Drag to spin carousel • Click the front card to open full case study
            </p>
          </div>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className={`p-2 rounded-full glass-panel transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-black/5 text-neutral-800'
            }`}
            title="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className={`text-xs font-mono font-bold ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {selectedIndex + 1} / {projects.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className={`p-2 rounded-full glass-panel transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-black/5 text-neutral-800'
            }`}
            title="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        id="three-project-showcase-canvas"
        className="relative w-full h-[360px] sm:h-[440px] cursor-grab active:cursor-grabbing"
      />

      {/* Current Project Action Drawer */}
      {currentProject && (
        <div className={`relative mt-2 p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-300 z-20 ${
          theme === 'dark'
            ? 'bg-white/[0.04] border-white/15'
            : 'bg-white/80 border-black/10 shadow-md'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                {currentProject.category}
              </span>
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {currentProject.type}
              </span>
            </div>
            <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              {currentProject.name}
            </h4>
            <p className={`text-xs max-w-xl line-clamp-2 mt-0.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {currentProject.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              id="btn-open-3d-case-study"
              onClick={() => onOpenCaseStudy(currentProject)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer shadow-lg"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open Case Study</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
