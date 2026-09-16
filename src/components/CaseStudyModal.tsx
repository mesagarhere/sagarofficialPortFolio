import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Video,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { selectedCaseStudy, closeCaseStudy, theme } = usePortfolio();

  if (!selectedCaseStudy) return null;

  const project = selectedCaseStudy;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeCaseStudy}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        id="case-study-modal-card"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 glass-panel border border-white/20 shadow-2xl my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          id="btn-close-case-study"
          onClick={closeCaseStudy}
          aria-label="Close case study details"
          className="absolute top-6 right-6 p-2 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold glass-pill text-neutral-300">
            {project.type}
          </span>
          {project.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
          <span className="text-xs text-neutral-400 flex items-center gap-1 ml-auto">
            <Calendar className="w-3.5 h-3.5" /> {project.date}
          </span>
        </div>

        {/* Project Title */}
        <h2
          id="case-study-title"
          className={`text-2xl sm:text-3xl font-bold tracking-tight mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {project.name}
        </h2>

        {/* Short Summary */}
        <p className="text-base text-neutral-300 leading-relaxed mb-8">
          {project.shortDescription}
        </p>

        {/* Two-column overview: Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* The Problem / Challenge */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>The Challenge / Problem</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* The Solution */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-emerald-400 tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>The Solution</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Sagar's Role & Contribution */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 mb-8">
          <span className="text-xs uppercase font-bold text-blue-400 tracking-wider block mb-1.5">
            My Role & Execution
          </span>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {project.myRole}
          </p>
        </div>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm uppercase font-bold tracking-wider text-neutral-400 mb-3">
              Core Capabilities & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-neutral-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools & Tech Stack */}
        <div className="mb-8">
          <h4 className="text-sm uppercase font-bold tracking-wider text-neutral-400 mb-3">
            Tools & Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.toolsAndTechnologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium glass-pill text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Final Result / Impact */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border border-blue-500/20 mb-8">
          <span className="text-xs uppercase font-bold text-blue-400 tracking-wider block mb-1">
            Final Result & Measurable Impact
          </span>
          <p className="text-sm sm:text-base font-medium text-neutral-100 leading-relaxed">
            {project.finalResult}
          </p>
        </div>

        {/* Links & External Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.gitHubLink && (
              <a
                href={project.gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium glass-button-secondary cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white glass-button-primary cursor-pointer"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={closeCaseStudy}
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
