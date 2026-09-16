import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ThreeBackgroundField } from './ThreeBackgroundField';

export const LiquidBackground: React.FC = () => {
  const { theme } = usePortfolio();

  return (
    <div
      id="liquid-background-container"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Deep base backdrop */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          theme === 'dark' ? 'bg-[#060709]' : 'bg-[#e9edf2]'
        }`}
      />

      {/* 3D Depth Particle Constellation */}
      <ThreeBackgroundField />

      {/* Ambient Orb 1 - Subtle Deep Blue Glow */}
      <div
        className={`absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-40 animate-orb-1 transition-opacity duration-1000 ${
          theme === 'dark' ? 'bg-blue-600/30' : 'bg-blue-400/20'
        }`}
      />

      {/* Ambient Orb 2 - Subtle Purple / Violet Glow */}
      <div
        className={`absolute top-[40%] -right-[15%] w-[750px] h-[750px] rounded-full blur-[160px] opacity-35 animate-orb-2 transition-opacity duration-1000 ${
          theme === 'dark' ? 'bg-purple-600/25' : 'bg-indigo-400/18'
        }`}
      />

      {/* Ambient Orb 3 - Soft Atmosphere Lighting */}
      <div
        className={`absolute -bottom-[20%] left-[20%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-30 animate-orb-3 transition-opacity duration-1000 ${
          theme === 'dark' ? 'bg-cyan-600/20' : 'bg-slate-400/20'
        }`}
      />

      {/* Secondary Ambient Accent - Subtle Soft Refraction without harsh white glare */}
      <div
        className={`absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
          theme === 'dark' ? 'bg-white/[0.04]' : 'bg-blue-300/15'
        }`}
      />

      {/* Micro Grid Overlay for Depth */}
      <div
        className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)]'
            : 'bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)]'
        } [background-size:32px_32px] opacity-50`}
      />
    </div>
  );
};
