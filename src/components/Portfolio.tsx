import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard3D } from './TiltCard3D';
import { ThreeProjectShowcase } from './ThreeProjectShowcase';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  Plus,
  Rotate3d,
  Grid,
  Edit3,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Web Development',
  'Python',
  'Video Editing',
  'AI Video',
  'AI Animation',
  'Thumbnails',
  'Posters',
  'Content Creation'
] as const;

export const Portfolio: React.FC = () => {
  const {
    data,
    theme,
    openCaseStudy,
    isAdminAuthenticated,
    openAdminStudio
  } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [portfolioViewMode, setPortfolioViewMode] = useState<'3d' | 'grid'>('3d');

  const filteredProjects =
    selectedCategory === 'All'
      ? data.projects
      : data.projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Curated Portfolio</span>
          </div>
          <h2
            id="portfolio-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Selected Work
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Real implementations, client solutions, and technical explorations. Each project represents verified work and honest outcomes.
          </p>

          {/* 3D vs Grid Mode Toggle */}
          <div className="flex items-center justify-center gap-1.5 p-1 mt-6 rounded-full glass-panel border border-white/20 w-fit mx-auto shadow-lg">
            <button
              type="button"
              id="portfolio-toggle-3d-view"
              onClick={() => setPortfolioViewMode('3d')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                portfolioViewMode === '3d'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5 text-blue-300 animate-spin-slow" />
              <span>🪐 3D Spatial Carousel</span>
            </button>
            <button
              type="button"
              id="portfolio-toggle-grid-view"
              onClick={() => setPortfolioViewMode('grid')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                portfolioViewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Standard Grid</span>
            </button>
          </div>

          {/* Admin-Only Project Management Trigger */}
          {isAdminAuthenticated && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                id="btn-portfolio-admin-manage"
                onClick={() => openAdminStudio('projects')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Add / Edit Projects (Admin Studio)</span>
              </button>
            </div>
          )}
        </div>

        {/* 3D Spatial Carousel View */}
        {portfolioViewMode === '3d' && (
          <div className="animate-in fade-in zoom-in-95 duration-300 mb-8">
            <ThreeProjectShowcase onOpenCaseStudy={openCaseStudy} />
          </div>
        )}

        {/* Traditional Grid View */}
        {portfolioViewMode === 'grid' && (
          <div className="animate-in fade-in duration-300">
            {/* Category Filter Horizontal Scroll / Wrap */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    id={`portfolio-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'glass-button-primary text-white shadow-lg'
                        : theme === 'dark'
                          ? 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                          : 'bg-black/5 border border-black/10 text-neutral-600 hover:text-neutral-950 hover:bg-black/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

        {/* Projects Grid or Honest Empty State */}
        {filteredProjects.length === 0 ? (
          <div
            id="portfolio-empty-state"
            className="py-16 px-6 text-center rounded-3xl glass-panel border border-white/10 max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center glass-panel text-neutral-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Projects are being added. Check back soon.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              New project case studies for the{' '}
              <span className="text-blue-400 font-medium">{selectedCategory}</span> category are
              currently in production.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 rounded-full text-xs font-semibold glass-button-secondary cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <TiltCard3D
                key={project.id}
                maxTilt={5}
                scale={1.01}
                glare={true}
                className="h-full"
              >
                <div
                  id={`project-card-${project.id}`}
                  className="group relative rounded-3xl p-6 sm:p-8 glass-panel glass-panel-hover flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top Bar: Category, Type & Featured Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {project.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium glass-pill text-neutral-300">
                          {project.type}
                        </span>
                      </div>

                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>

                    {/* Project Name */}
                    <h3
                      className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 group-hover:text-blue-400 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {project.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                      {project.shortDescription}
                    </p>

                    {/* Problem & Result Mini-Highlights */}
                    <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                      <div className="text-xs">
                        <span className="font-semibold text-neutral-300 block mb-0.5">Problem:</span>
                        <span className="text-neutral-400 line-clamp-2">{project.problem}</span>
                      </div>
                      <div className="text-xs pt-2 border-t border-white/5">
                        <span className="font-semibold text-emerald-400 block mb-0.5">Outcome:</span>
                        <span className="text-neutral-300 line-clamp-2">{project.finalResult}</span>
                      </div>
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.toolsAndTechnologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        id={`btn-case-study-${project.id}`}
                        onClick={() => openCaseStudy(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Case Study</span>
                      </button>

                      {isAdminAuthenticated && (
                        <button
                          type="button"
                          onClick={() => openAdminStudio('projects')}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 cursor-pointer"
                          title="Edit this project in Admin Studio"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.gitHubLink && (
                        <a
                          href={project.gitHubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${project.name}`}
                          className="p-2 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.name}`}
                          className="p-2 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
</section>
);
};
