import React from 'react';
import { usePortfolio, ActivePage } from '../context/PortfolioContext';
import {
  Home,
  Sparkles,
  Layers,
  User,
  Mail,
  Grid,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface PageItem {
  id: ActivePage;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
}

export const PAGE_ITEMS: PageItem[] = [
  {
    id: 'home',
    label: 'Home',
    shortLabel: 'Home',
    icon: Home,
    description: 'Hero, introduction & quick actions'
  },
  {
    id: 'content',
    label: 'Content & Media',
    shortLabel: 'Content',
    icon: Sparkles,
    description: 'Thumbnails, AI videos & portfolio'
  },
  {
    id: 'services',
    label: 'Services & Pricing',
    shortLabel: 'Services',
    icon: Layers,
    description: 'Python, web dev, rates ($5+) & process'
  },
  {
    id: 'about',
    label: 'About & Skills',
    shortLabel: 'About',
    icon: User,
    description: 'Bio, experience, skills & statistics'
  },
  {
    id: 'contact',
    label: 'Contact & Hire',
    shortLabel: 'Contact',
    icon: Mail,
    description: 'Direct email, Fiverr & inquiry'
  },
  {
    id: 'all',
    label: 'All Pages (Full)',
    shortLabel: 'All',
    icon: Grid,
    description: 'Continuous single-page view'
  }
];

export const PageSwitcherBar: React.FC = () => {
  const { activePage, setActivePage, theme } = usePortfolio();

  return (
    <div
      id="page-switcher-dock-container"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 max-w-[95vw] pointer-events-none"
    >
      <div
        id="page-switcher-dock"
        className={`pointer-events-auto flex items-center gap-1 p-1.5 rounded-full shadow-2xl transition-all duration-300 border ${
          theme === 'dark'
            ? 'bg-neutral-950/85 border-white/20 shadow-black/70 backdrop-blur-2xl'
            : 'bg-white/90 border-black/10 shadow-black/15 backdrop-blur-2xl'
        }`}
      >
        {PAGE_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              id={`switch-page-${item.id}`}
              onClick={() => setActivePage(item.id)}
              title={`${item.label}: ${item.description}`}
              className={`group relative flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.03]'
                  : theme === 'dark'
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'opacity-80'
                }`}
              />
              <span className="hidden sm:inline whitespace-nowrap">
                {item.shortLabel}
              </span>

              {/* Active dot indicator on mobile */}
              {isActive && (
                <span className="sm:hidden w-1 h-1 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Bottom Page Pagination / Switcher for Separate Pages
export const PagePaginationBar: React.FC = () => {
  const { activePage, setActivePage } = usePortfolio();

  if (activePage === 'all') return null;

  const sequence: ActivePage[] = ['home', 'content', 'services', 'about', 'contact'];
  const currentIndex = sequence.indexOf(activePage);

  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? sequence[currentIndex - 1] : null;
  const nextPage = currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : null;

  const getPageTitle = (p: ActivePage) => {
    switch (p) {
      case 'home':
        return 'Home';
      case 'content':
        return 'Content & Media';
      case 'services':
        return 'Services & Pricing';
      case 'about':
        return 'About & Skills';
      case 'contact':
        return 'Contact & Hire';
      default:
        return 'All Pages';
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/10 mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl glass-panel">
        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block mb-1">
            Separate Page Navigation
          </span>
          <p className="text-xs sm:text-sm text-neutral-200">
            Viewing <strong className="text-blue-400">{getPageTitle(activePage)}</strong> separately
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {prevPage && (
            <button
              type="button"
              id="pagination-btn-prev"
              onClick={() => setActivePage(prevPage)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{getPageTitle(prevPage)}</span>
            </button>
          )}

          {nextPage && (
            <button
              type="button"
              id="pagination-btn-next"
              onClick={() => setActivePage(nextPage)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20"
            >
              <span>{getPageTitle(nextPage)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            id="pagination-btn-view-all"
            onClick={() => setActivePage('all')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white text-xs font-medium transition-all cursor-pointer border border-white/10"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Full Page</span>
          </button>
        </div>
      </div>
    </section>
  );
};
