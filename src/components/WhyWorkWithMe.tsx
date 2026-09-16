import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard3D } from './TiltCard3D';
import {
  Sparkles,
  Lightbulb,
  Cpu,
  Search,
  HeartHandshake,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

const WHY_ICONS = [
  Lightbulb,
  Cpu,
  Search,
  HeartHandshake,
  Smartphone,
  ShieldCheck
];

export const WhyWorkWithMe: React.FC = () => {
  const { data, theme } = usePortfolio();

  return (
    <section
      id="why-work-with-me"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Value & Standards</span>
          </div>
          <h2
            id="why-work-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Why Work With Me?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Honest communication, reliable execution, and modern craft brought to every single collaboration.
          </p>
        </div>

        {/* 6 Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.whyWorkWithMe.map((item, idx) => {
            const IconComp = WHY_ICONS[idx % WHY_ICONS.length];
            return (
              <TiltCard3D
                key={idx}
                maxTilt={6}
                scale={1.015}
                glare={true}
                className="h-full"
              >
                <div
                  id={`why-card-${item.number}`}
                  className="group relative rounded-3xl p-7 glass-panel glass-panel-hover flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5 [transform:translateZ(15px)]">
                      <span className="text-sm font-mono font-bold tracking-wider px-3 py-1 rounded-full glass-panel border border-white/20 text-blue-400">
                        {item.number}
                      </span>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 text-neutral-400 group-hover:text-white transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3
                      className={`text-lg font-bold tracking-tight mb-2.5 group-hover:text-blue-400 transition-colors [transform:translateZ(20px)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
