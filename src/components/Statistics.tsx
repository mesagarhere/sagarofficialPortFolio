import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard3D } from './TiltCard3D';
import { Layers, Lightbulb, Cpu, Users } from 'lucide-react';

const STAT_ICONS = [Layers, Lightbulb, Cpu, Users];

export const Statistics: React.FC = () => {
  const { data, theme } = usePortfolio();

  return (
    <section
      id="statistics"
      className="relative py-16 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.statistics.map((stat, idx) => {
            const IconComponent = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <TiltCard3D
                key={stat.id}
                maxTilt={8}
                scale={1.02}
                glare={true}
                className="h-full"
              >
                <div
                  id={`stat-card-${stat.id}`}
                  className="relative rounded-3xl p-6 glass-panel glass-panel-hover flex flex-col justify-between text-left h-full"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center glass-panel border border-white/20 text-blue-400 mb-4 shadow-inner [transform:translateZ(15px)]">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Value / Metric */}
                    <div
                      className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 leading-tight [transform:translateZ(20px)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-xs uppercase font-bold tracking-wider text-blue-400 mb-2 [transform:translateZ(10px)]">
                      {stat.label}
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs text-neutral-400 leading-relaxed border-t border-white/10 pt-3 mt-2">
                    {stat.description}
                  </p>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
