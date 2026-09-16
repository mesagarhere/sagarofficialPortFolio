import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard3D } from './TiltCard3D';
import {
  Sparkles,
  Clock,
  Tag,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  UserCheck,
  PackageCheck,
  Edit3
} from 'lucide-react';

export const Services: React.FC = () => {
  const { data, theme, isAdminAuthenticated, openAdminStudio } = usePortfolio();
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  const handleServiceSelect = (serviceName: string) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to preselect service in contact form
      window.dispatchEvent(new CustomEvent('select-service', { detail: serviceName }));
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Service Offerings</span>
          </div>
          <h2
            id="services-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            What I Can Do For You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Transparent, accessible services designed for creators, startups, and individuals seeking dependable technical and creative execution.
          </p>

          {/* Admin-Only Service Edit Trigger */}
          {isAdminAuthenticated && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                id="btn-services-admin-edit"
                onClick={() => openAdminStudio('services')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Services, Packages & Pricing (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.services.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <TiltCard3D
                key={service.id}
                maxTilt={5}
                scale={1.01}
                glare={true}
                className="h-full"
              >
                <div
                  id={`service-card-${service.id}`}
                  className="group relative rounded-3xl p-6 sm:p-7 glass-panel glass-panel-hover flex flex-col justify-between h-full"
                >
                <div>
                  {/* Top Bar: Title & Starting Price */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3
                        className={`text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors ${
                          theme === 'dark' ? 'text-white' : 'text-neutral-900'
                        }`}
                      >
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          {service.estimatedDeliveryTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-emerald-400" />
                          From {service.startingPrice} {service.currency}
                        </span>
                      </div>
                    </div>

                    {service.featured && (
                      <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Who It Is For */}
                  <div className="flex items-start gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-neutral-300 mb-4">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-neutral-200">Ideal For: </span>
                      {service.whoItIsFor}
                    </div>
                  </div>

                  {/* What Is Included (Preview 3 items or full) */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      What's Included:
                    </span>
                    {(isExpanded ? service.whatIsIncluded : service.whatIsIncluded.slice(0, 3)).map(
                      (item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Expandable Deliverables Section */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-white/10 space-y-3 mb-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5 flex items-center gap-1.5">
                          <PackageCheck className="w-3.5 h-3.5" />
                          What You Receive:
                        </span>
                        <ul className="space-y-1 text-xs text-neutral-300 pl-1">
                          {service.whatTheClientReceives.map((rec, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                          Tools & Workflow:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.tools.map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 border border-white/10 text-neutral-300"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Details toggle & CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => toggleExpand(service.id)}
                    className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Full Scope'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id={`btn-order-${service.id}`}
                      onClick={() => handleServiceSelect(service.name)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
