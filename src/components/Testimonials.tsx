import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  MessageSquareQuote,
  Star,
  Sparkles,
  Calendar,
  Briefcase,
  Plus,
  Edit3
} from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { data, theme, isAdminAuthenticated, openAdminStudio } = usePortfolio();

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-purple-400" />
            <span>Client Feedback</span>
          </div>
          <h2
            id="testimonials-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Client Testimonials
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Honest reviews and experiences from collaborators and clients.
          </p>

          {/* Admin-Only Testimonials Trigger */}
          {isAdminAuthenticated && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={() => openAdminStudio('testimonials')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all cursor-pointer shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Manage Testimonials (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State or Testimonial Grid */}
        {data.testimonials.length === 0 ? (
          <div
            id="testimonials-empty-state"
            className="py-16 px-6 text-center rounded-3xl glass-panel border border-white/10 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center glass-panel text-neutral-400">
              <MessageSquareQuote className="w-7 h-7 text-blue-400" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Client testimonials will appear here as I complete more projects.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-6">
              I am actively taking on new freelance challenges on Fiverr and direct client collaborations. Work with me and share your review!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={data.socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white glass-button-fiverr cursor-pointer"
              >
                Hire Me on Fiverr
              </a>
              {isAdminAuthenticated && (
                <button
                  type="button"
                  onClick={() => openAdminStudio('testimonials')}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Testimonial (Admin)</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.testimonials.map((t) => (
              <div
                key={t.id}
                id={`testimonial-card-${t.id}`}
                className="rounded-3xl p-6 sm:p-7 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="text-sm text-neutral-300 leading-relaxed italic mb-6">
                    "{t.review}"
                  </p>
                </div>

                {/* Client Profile */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  {t.clientImage ? (
                    <img
                      src={t.clientImage}
                      alt={t.clientName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center glass-panel text-white font-bold text-xs">
                      {t.clientName.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {t.clientName}
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      {t.clientRole} • {t.business}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
