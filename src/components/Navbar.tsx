import React, { useState, useEffect } from 'react';
import { usePortfolio, ActivePage } from '../context/PortfolioContext';
import { Menu, X, Sun, Moon, ArrowUpRight, Sparkles, Lock, ShieldCheck, Edit3 } from 'lucide-react';

interface NavLinkItem {
  label: string;
  page: ActivePage;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', page: 'home', href: '#home' },
  { label: 'Content', page: 'content', href: '#portfolio' },
  { label: 'Services', page: 'services', href: '#services' },
  { label: 'About', page: 'about', href: '#about' },
  { label: 'Contact', page: 'contact', href: '#contact' },
  { label: 'All', page: 'all', href: '#all' },
];

export const Navbar: React.FC = () => {
  const {
    data,
    theme,
    toggleTheme,
    activePage,
    setActivePage,
    isAdminAuthenticated,
    setIsAdminOpen,
    setIsAdminLoginOpen
  } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (activePage !== 'all') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'services', 'portfolio', 'process', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    page: ActivePage,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActivePage(page);
    if (activePage === 'all' && page === 'all') {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation-header"
      className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <nav
          id="liquid-navbar"
          aria-label="Main Navigation"
          className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? theme === 'dark'
                ? 'bg-black/50 border border-white/20 shadow-xl shadow-black/40 backdrop-blur-2xl'
                : 'bg-white/80 border border-black/10 shadow-lg shadow-black/5 backdrop-blur-2xl'
              : theme === 'dark'
                ? 'bg-white/[0.06] border border-white/12 shadow-md shadow-black/20 backdrop-blur-xl'
                : 'bg-white/60 border border-black/5 shadow-sm backdrop-blur-xl'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            id="nav-logo"
            onClick={(e) => handleNavClick(e, 'home', '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm tracking-tight border border-white/25 bg-gradient-to-tr from-white/20 to-white/5 text-white transition-transform group-hover:scale-105 shadow-inner">
              <span className={theme === 'dark' ? 'text-white' : 'text-neutral-900 font-extrabold'}>
                {data.personalInfo.name.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-semibold tracking-tight text-sm sm:text-base leading-none transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {data.personalInfo.name}
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Page Switcher) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive =
                activePage === link.page ||
                (activePage === 'all' && activeSection === link.href.substring(1));
              return (
                <button
                  key={link.label}
                  type="button"
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, link.page, link.href)}
                  className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : theme === 'dark'
                        ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions: Theme Toggle & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              id="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className={`p-2 rounded-full transition-all duration-200 border cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/15 text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'border-black/10 text-neutral-600 hover:text-neutral-900 hover:bg-black/5'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Admin Security / Edit Mode Indicator */}
            {isAdminAuthenticated ? (
              <button
                type="button"
                id="nav-admin-active-btn"
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all cursor-pointer shadow-md shadow-emerald-500/25"
                title="Admin Mode Active — Click to Edit Portfolio"
                aria-label="Admin Edit Portfolio"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Portfolio</span>
              </button>
            ) : (
              <button
                type="button"
                id="nav-admin-login-btn"
                onClick={() => setIsAdminLoginOpen(true)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  theme === 'dark'
                    ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                    : 'border-black/10 text-neutral-500 hover:text-neutral-900 hover:bg-black/5'
                }`}
                title="Admin Login & Unlock Editing"
                aria-label="Admin Login & Unlock Editing"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            {/* Primary CTA - Hire Me */}
            <button
              type="button"
              id="nav-cta-hire-me"
              onClick={(e) => handleNavClick(e, 'contact', '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium text-white glass-button-primary cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 rounded-full border transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/15 text-white hover:bg-white/10'
                  : 'border-black/10 text-neutral-900 hover:bg-black/5'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Liquid Glass Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className={`md:hidden mt-2 p-4 rounded-3xl transition-all duration-300 border ${
              theme === 'dark'
                ? 'bg-neutral-950/85 border-white/15 backdrop-blur-2xl shadow-2xl'
                : 'bg-white/90 border-black/10 backdrop-blur-2xl shadow-xl'
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 px-3 py-1">
                Switch Pages Separately
              </span>
              {NAV_LINKS.map((link) => {
                const isActive =
                  activePage === link.page ||
                  (activePage === 'all' && activeSection === link.href.substring(1));
                return (
                  <button
                    key={link.label}
                    type="button"
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, link.page, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : theme === 'dark'
                          ? 'text-neutral-300 hover:text-white hover:bg-white/5'
                          : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Active</span>}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                {isAdminAuthenticated ? (
                  <button
                    type="button"
                    id="mobile-nav-admin-edit"
                    onClick={() => {
                      setIsAdminOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Portfolio (Admin Studio)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="mobile-nav-admin-login"
                    onClick={() => {
                      setIsAdminLoginOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white glass-panel cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Admin Login & Unlock</span>
                  </button>
                )}

                <button
                  type="button"
                  id="mobile-cta-hire-me"
                  onClick={(e) => handleNavClick(e, 'contact', '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white glass-button-primary text-center cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hire Me</span>
                </button>
                <a
                  href={data.socialLinks.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-cta-fiverr"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white glass-button-fiverr text-center"
                >
                  <span>Hire on Fiverr</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
