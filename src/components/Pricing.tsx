import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Tag,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Edit3
} from 'lucide-react';

export const Pricing: React.FC = () => {
  const { data, theme, isAdminAuthenticated, openAdminStudio } = usePortfolio();

  const handleRequestQuote = (packageName: string) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(
        new CustomEvent('select-service', {
          detail: `Pricing Package: ${packageName}`
        })
      );
    }
  };

  const enabledTiers = data.pricing.filter((t) => t.enabled !== false);

  return (
    <section
      id="pricing"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            <span>Clear & Honest Pricing</span>
          </div>
          <h2
            id="pricing-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Services & Pricing
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Starting from <span className="text-emerald-400 font-semibold">$5</span>. Transparent rates tailored for creators, startups, and growing brands.
          </p>

          {/* Admin-Only Pricing Management Trigger */}
          {isAdminAuthenticated && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                id="btn-pricing-admin-edit"
                onClick={() => openAdminStudio('services')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Manage Packages & Pricing Tiers (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {enabledTiers.map((tier) => {
            const isPopular = tier.popular;
            return (
              <div
                key={tier.id}
                id={`pricing-card-${tier.id}`}
                className={`relative rounded-3xl p-7 sm:p-8 glass-panel glass-panel-hover flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'border-blue-500/40 shadow-2xl shadow-blue-500/10'
                    : 'border-white/15'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{tier.badge || 'Most Popular'}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Name & Badge */}
                  <div className="mb-4">
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="py-5 my-4 border-y border-white/10 flex items-baseline gap-2">
                    {tier.price.toLowerCase() === 'custom' ? (
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          theme === 'dark' ? 'text-white' : 'text-neutral-950'
                        }`}
                      >
                        Custom Quote
                      </span>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-neutral-400">
                          {tier.currency === 'USD' ? '$' : tier.currency}
                        </span>
                        <span
                          className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                            theme === 'dark' ? 'text-white' : 'text-neutral-950'
                          }`}
                        >
                          {tier.price}
                        </span>
                        {tier.billingPeriod && (
                          <span className="text-xs text-neutral-400 font-medium">
                            / {tier.billingPeriod}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Delivery & Revisions info */}
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-6 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {tier.deliveryTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                      {tier.revisions}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                      Package Inclusions:
                    </span>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <a
                    href={data.socialLinks.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-white glass-button-fiverr text-center cursor-pointer"
                  >
                    <span>Order on Fiverr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleRequestQuote(tier.name)}
                    className="w-full py-2.5 rounded-full text-xs font-semibold glass-button-secondary text-center cursor-pointer"
                  >
                    Request a Custom Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
