import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, Download, Eye, Sparkles, ShieldCheck } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { data, theme, openCvModal } = usePortfolio();

  return (
    <section
      id="cv-section"
      className="relative py-20 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div
          id="cv-glass-panel"
          className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-white/20 shadow-2xl text-center overflow-hidden"
        >
          {/* Subtle Ambient Background Accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center glass-panel border border-white/20 text-blue-400 mb-5 shadow-inner">
              <FileText className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Qualifications & Skills</span>
            </div>

            <h2
              id="cv-section-heading"
              className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Curriculum Vitae & Professional Profile
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-lg mb-8 leading-relaxed">
              Review my technical skill set, development experience, and digital creative background in a clean, comprehensive summary.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* View CV Button */}
              <button
                type="button"
                id="btn-view-cv-section"
                onClick={openCvModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white glass-button-primary cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View CV</span>
              </button>

              {/* Download CV Button */}
              <button
                type="button"
                id="btn-download-cv-section"
                onClick={openCvModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold glass-button-secondary cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download My CV</span>
              </button>
            </div>

            <p className="text-xs text-neutral-400 mt-5">
              Easily customizable or replaceable directly via the Admin Studio settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
