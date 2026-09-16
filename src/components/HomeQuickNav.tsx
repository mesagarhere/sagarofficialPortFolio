import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Layers, User, Mail, ArrowRight, CheckCircle, Flame } from 'lucide-react';

export const HomeQuickNav: React.FC = () => {
  const { setActivePage, data, theme } = usePortfolio();

  const sections = [
    {
      id: 'content' as const,
      title: 'Content & Media Showcase',
      description: 'YouTube thumbnails, AI video generation, graphic designs, and web development projects.',
      icon: Sparkles,
      tag: 'Portfolio & Works',
      color: 'from-amber-500/20 to-orange-500/20 border-orange-500/30 text-amber-400'
    },
    {
      id: 'services' as const,
      title: 'Services & Pricing',
      description: 'Python scripts, custom bots, responsive web engineering & digital visual design starting at $5.',
      icon: Layers,
      tag: 'Starting at $5',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400'
    },
    {
      id: 'about' as const,
      title: 'About Sagar D.',
      description: 'Full stack developer, Python specialist & AI digital creator background, workflow & skills.',
      icon: User,
      tag: 'Skills & Experience',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400'
    },
    {
      id: 'contact' as const,
      title: 'Contact & Hire',
      description: 'Direct email, Fiverr escrow order, rapid response SLA & 24/7 AI client concierge.',
      icon: Mail,
      tag: 'Hire Today',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400'
    }
  ];

  return (
    <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-3">
          Explore Portfolio Sections
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Explore by Category
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl mx-auto">
          Switch between pages separately or use the navigation bar to browse my work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              id={`home-quick-nav-${sec.id}`}
              onClick={() => setActivePage(sec.id)}
              className="group text-left p-5 rounded-3xl glass-panel transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/40 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border bg-gradient-to-br ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                    {sec.tag}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors mb-2">
                  {sec.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {sec.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mt-4 pt-3 border-t border-white/10 group-hover:translate-x-1 transition-transform">
                <span>Open Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
