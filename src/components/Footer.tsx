import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowUp,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Flame,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, theme, setActivePage, openAdminStudio, isAdminAuthenticated } = usePortfolio();
  const { personalInfo, socialLinks } = data;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks: { label: string; page: any }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Content & Media', page: 'content' },
    { label: 'Services & Pricing', page: 'services' },
    { label: 'About & Skills', page: 'about' },
    { label: 'Contact & Hire', page: 'contact' },
    { label: 'All (Full View)', page: 'all' },
  ];

  return (
    <footer
      id="main-footer"
      className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-10 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10 items-start">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border border-white/20 glass-panel text-white">
                {personalInfo.name.charAt(0)}
              </div>
              <span
                className={`text-xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {personalInfo.name}
              </span>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
              Creating digital experiences through code, creativity and AI.
            </p>

            {/* Fiverr CTA Badge */}
            <a
              href={socialLinks.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-fiverr-cta"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold glass-button-fiverr cursor-pointer"
            >
              <Flame className="w-4 h-4 text-white" />
              <span>Hire Me on Fiverr</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setActivePage(item.page)}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-4">
              Connect Directly
            </h4>
            {/* Direct Email display in Footer */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 mb-4 text-xs">
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] uppercase font-bold text-blue-400">Direct Email</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-[10px] text-neutral-300 hover:text-white px-1.5 py-0.5 rounded bg-white/10 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${socialLinks.email}`}
                className="font-mono text-[11px] text-neutral-200 hover:text-blue-300 transition-colors break-all block"
              >
                {socialLinks.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <a
                href={`mailto:${socialLinks.email}`}
                aria-label="Email Sagar"
                title="Send Email"
                className="p-2.5 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(socialLinks.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Gmail"
                title="Open directly in Gmail Web"
                className="p-2.5 rounded-full glass-panel text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {socialLinks.whatsapp && socialLinks.whatsapp !== 'EDITABLE' && (
                <a
                  href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2.5 rounded-full glass-panel text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && socialLinks.instagram !== 'Editabel' && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-full glass-panel text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-neutral-400">
              Based in {personalInfo.location}. Open to worldwide remote projects.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Owner Admin Lock & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <p id="footer-copyright">
              © 2026 Sagar D. All rights reserved.
            </p>
            <span className="text-neutral-700 select-none">•</span>
            <button
              type="button"
              id="footer-admin-login-btn"
              onClick={openAdminStudio}
              title={isAdminAuthenticated ? "Open Admin Studio" : "Admin Login (Owner Only)"}
              className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Admin (Active)' : 'Admin'}</span>
            </button>
          </div>

          <button
            type="button"
            id="btn-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
