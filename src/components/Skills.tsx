import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard3D } from './TiltCard3D';
import { ThreeSkillGalaxy } from './ThreeSkillGalaxy';
import {
  Code2,
  Globe,
  Sparkles,
  Video,
  Cpu,
  Layers,
  Image as ImageIcon,
  Palette,
  Terminal,
  Filter,
  Rotate3d,
  Grid,
  Edit3
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal: Terminal,
  Globe: Globe,
  Sparkles: Sparkles,
  Video: Video,
  Cpu: Cpu,
  Layers: Layers,
  Image: ImageIcon,
  Palette: Palette,
  Code2: Code2
};

export const Skills: React.FC = () => {
  const { data, theme, isAdminAuthenticated, openAdminStudio } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'planetarium'>('planetarium');

  const categories = [
    { key: 'ALL', label: 'All Disciplines' },
    { key: 'DEVELOPMENT', label: 'Development' },
    { key: 'CONTENT & VIDEO', label: 'Content & Video' },
    { key: 'AI CREATIVE', label: 'AI Creative' },
    { key: 'DESIGN', label: 'Design' }
  ];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? data.skills
      : data.skills.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Core Capabilities</span>
          </div>
          <h2
            id="skills-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            My Skills & Expertise
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Practical technical and creative proficiency grounded in real tools, clean architecture, and modern workflows.
          </p>

          {/* View Mode Switcher: 3D Planetarium vs Traditional Grid */}
          <div className="flex items-center justify-center gap-1.5 p-1 mt-6 rounded-full glass-panel border border-white/20 w-fit mx-auto shadow-lg">
            <button
              type="button"
              id="skills-toggle-3d-view"
              onClick={() => setViewMode('planetarium')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'planetarium'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5 text-emerald-300 animate-spin-slow" />
              <span>🪐 Interactive 3D Planetarium</span>
            </button>
            <button
              type="button"
              id="skills-toggle-grid-view"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Standard Grid</span>
            </button>
          </div>

          {/* Admin-Only Skills Management Trigger */}
          {isAdminAuthenticated && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                id="btn-skills-admin-edit"
                onClick={() => openAdminStudio('personal')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Skills, Tools & Capabilities (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* 3D Planetarium View */}
        {viewMode === 'planetarium' && (
          <div className="animate-in fade-in zoom-in-95 duration-300 mb-8">
            <ThreeSkillGalaxy />
          </div>
        )}

        {/* Traditional Grid View (or always available below) */}
        {viewMode === 'grid' && (
          <div className="animate-in fade-in duration-300">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    id={`filter-skill-${cat.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'glass-button-primary text-white shadow-lg'
                        : theme === 'dark'
                          ? 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                          : 'bg-black/5 border border-black/10 text-neutral-600 hover:text-neutral-950 hover:bg-black/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Skills Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const IconComp = ICON_MAP[skill.iconName] || Sparkles;
            return (
              <TiltCard3D
                key={skill.id}
                maxTilt={8}
                scale={1.02}
                glare={true}
                className="h-full"
              >
                <div
                  id={`skill-card-${skill.id}`}
                  className="group relative rounded-3xl p-6 glass-panel glass-panel-hover flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top Bar: Icon + Category Badge */}
                    <div className="flex items-center justify-between mb-4 [transform:translateZ(15px)]">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center glass-panel border border-white/20 text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3
                      className={`text-lg font-bold tracking-tight mb-2 group-hover:text-blue-400 transition-colors [transform:translateZ(20px)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {skill.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {/* Tools Tags */}
                  <div className="pt-4 border-t border-white/10 [transform:translateZ(10px)]">
                    <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-2">
                      Key Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
