import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  MessageSquare,
  FileCheck,
  Compass,
  Code2,
  RefreshCw,
  Send,
  LifeBuoy,
  Sparkles
} from 'lucide-react';

const STEP_ICONS = [
  MessageSquare,
  FileCheck,
  Compass,
  Code2,
  RefreshCw,
  Send,
  LifeBuoy
];

export const WorkProcess: React.FC = () => {
  const { data, theme } = usePortfolio();

  return (
    <section
      id="process"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Structured Workflow</span>
          </div>
          <h2
            id="process-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            How I Work
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            A transparent 7-step process guaranteeing clarity, agreed milestones, and zero unpleasant surprises.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 -translate-y-1/2 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.workProcess.map((step, idx) => {
              const IconComp = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <div
                  key={idx}
                  id={`process-step-${step.step}`}
                  className="group relative rounded-3xl p-6 glass-panel glass-panel-hover flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center glass-panel border border-white/20 text-blue-400 font-mono font-bold text-sm shadow-inner group-hover:scale-105 transition-transform">
                        {step.step}
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/[0.04] text-neutral-400">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-base font-bold tracking-tight mb-2 group-hover:text-blue-400 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
