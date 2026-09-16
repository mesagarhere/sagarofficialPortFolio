import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
  Flame,
  Clock,
  MapPin,
  Sparkles,
  Copy,
  Check,
  Globe,
  Bot
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, theme } = usePortfolio();
  const { socialLinks, contactInfo, services } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: services[0]?.name || 'Python Development',
    budget: '$5 – $25 (Quick Task)',
    projectDetails: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedInquiry, setCopiedInquiry] = useState(false);
  const [preparedInquiry, setPreparedInquiry] = useState<{
    subject: string;
    body: string;
    gmailUrl: string;
    mailtoUrl: string;
  } | null>(null);

  // Listen for custom event from services/pricing to prefill service
  useEffect(() => {
    const handleServiceSelect = (e: CustomEvent<string>) => {
      if (e.detail) {
        setFormData((prev) => ({ ...prev, service: e.detail }));
      }
    };
    window.addEventListener('select-service', handleServiceSelect as EventListener);
    return () =>
      window.removeEventListener('select-service', handleServiceSelect as EventListener);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyInquiry = () => {
    if (!preparedInquiry) return;
    const clipboardText = `To: ${socialLinks.email}\nSubject: ${preparedInquiry.subject}\n\n${preparedInquiry.body}`;
    navigator.clipboard.writeText(clipboardText);
    setCopiedInquiry(true);
    setTimeout(() => setCopiedInquiry(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!formData.projectDetails.trim() || formData.projectDetails.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please include a brief description of your project requirements (at least 10 characters).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const subject = `Project Inquiry: ${formData.service} from ${formData.name}`;
    const body = `Hi Sagar,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject Requirements:\n${formData.projectDetails}\n\nLooking forward to hearing from you!\n\nBest regards,\n${formData.name}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(socialLinks.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setPreparedInquiry({
      subject,
      body,
      gmailUrl,
      mailtoUrl
    });

    setTimeout(() => {
      setStatus('success');
      // Direct action: trigger Gmail web or default mailto
      try {
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      } catch {
        window.location.href = mailtoUrl;
      }
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      service: services[0]?.name || 'Python Development',
      budget: '$5 – $25 (Quick Task)',
      projectDetails: ''
    });
    setPreparedInquiry(null);
    setStatus('idle');
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Direct Inquiry & Email</span>
          </div>
          <h2
            id="contact-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Let's Work Together
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Have an idea, project or creative task? Send an email directly or start an inquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-7 rounded-3xl glass-panel border border-white/15">
              <h3
                className={`text-xl font-bold tracking-tight mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}
              >
                Fast Turnaround & Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                I am responsive across email, Fiverr, and messaging. Feel free to contact me directly on your preferred platform.
              </p>

              {/* Direct Email Focus Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-white/[0.04] to-purple-500/10 border border-blue-400/25 mb-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Direct Email Address
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${socialLinks.email}`}
                  className="block text-sm sm:text-base font-semibold text-white hover:text-blue-300 transition-colors break-all mb-3 font-mono"
                >
                  {socialLinks.email}
                </a>

                {/* Direct Email Action Buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(socialLinks.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium transition-colors cursor-pointer text-center"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>Open in Gmail</span>
                  </a>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer text-center"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>Default Mail</span>
                  </a>
                </div>
              </div>

              {/* Verified details */}
              <div className="space-y-3 mb-6 text-xs text-neutral-300">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-neutral-200 block">Location:</span>
                    <span>{contactInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-neutral-200 block">Response Time:</span>
                    <span>{contactInfo.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* 24/7 AI Customer Assistant Instant Help Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 border border-blue-400/30 mb-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-300 border border-blue-400/30">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Sagar's AI Assistant</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-200">Standing by 24/7 while Sagar is busy</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Instant
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 mb-3 leading-relaxed">
                  Need an immediate answer about Python scripts, web design, or $5 pricing? Ask the AI agent right now.
                </p>
                <button
                  type="button"
                  id="contact-open-ai-agent"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('open-ai-assistant', {
                        detail: { query: '' }
                      })
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-500/30 hover:bg-blue-500/40 text-white text-xs font-semibold border border-blue-400/40 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Chat with 24/7 AI Agent Now</span>
                </button>
              </div>

              {/* Primary Fiverr Showcase Banner */}
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-fiverr-card"
                className="flex items-center justify-between p-4 rounded-2xl glass-button-fiverr mb-6 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Order Safely on Fiverr
                    </span>
                    <span className="text-[11px] text-white/80">
                      Escrow protection & buyer guarantees
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Social Channels List */}
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 block mb-3">
                  Connect & Verify
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl glass-panel text-xs text-neutral-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">Email Directly</span>
                  </a>

                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl glass-panel text-xs text-neutral-300 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="truncate">GitHub</span>
                  </a>

                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl glass-panel text-xs text-neutral-300 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">LinkedIn</span>
                  </a>

                  {socialLinks.whatsapp && socialLinks.whatsapp !== 'EDITABLE' && (
                    <a
                      href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl glass-panel text-xs text-neutral-300 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="truncate">WhatsApp</span>
                    </a>
                  )}

                  {socialLinks.instagram && socialLinks.instagram !== 'Editabel' && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl glass-panel text-xs text-neutral-300 hover:text-white transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span className="truncate">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="lg:col-span-7">
            <div
              id="contact-form-container"
              className="p-7 sm:p-10 rounded-3xl glass-panel border border-white/20 shadow-2xl"
            >
              {status === 'success' && preparedInquiry ? (
                <div
                  id="contact-success-state"
                  className="py-6 text-center flex flex-col items-center animate-in fade-in duration-300"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    Inquiry Formatted Directly for Sagar!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto mb-5 leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your project request has been formatted and targeted directly to <span className="text-blue-400 font-mono font-medium">{socialLinks.email}</span>.
                  </p>

                  {/* Immediate Action Buttons Box */}
                  <div className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left mb-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/10 pb-2">
                      <span>Recipient:</span>
                      <span className="font-mono text-white font-medium">{socialLinks.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/10 pb-2">
                      <span>Service:</span>
                      <span className="text-white font-medium">{formData.service}</span>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <a
                        href={preparedInquiry.gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all cursor-pointer text-center"
                      >
                        <Globe className="w-4 h-4 shrink-0" />
                        <span>Open & Send in Gmail (Web)</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>

                      <a
                        href={preparedInquiry.mailtoUrl}
                        className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold glass-button-secondary cursor-pointer text-center"
                      >
                        <Mail className="w-4 h-4 shrink-0" />
                        <span>Default Mail App</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyInquiry}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors cursor-pointer"
                    >
                      {copiedInquiry ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied inquiry details to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Text & Recipient</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-5 py-2 rounded-full text-xs font-semibold glass-button-secondary cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={socialLinks.fiverr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-full text-xs font-semibold text-white glass-button-fiverr cursor-pointer"
                    >
                      Or Order on Fiverr
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-2xl text-sm transition-all outline-none border ${
                        theme === 'dark'
                          ? 'bg-white/[0.04] border-white/10 text-white placeholder-neutral-500 focus:border-blue-400 focus:bg-white/[0.07]'
                          : 'bg-black/[0.03] border-black/10 text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-3 rounded-2xl text-sm transition-all outline-none border ${
                        theme === 'dark'
                          ? 'bg-white/[0.04] border-white/10 text-white placeholder-neutral-500 focus:border-blue-400 focus:bg-white/[0.07]'
                          : 'bg-black/[0.03] border-black/10 text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Service & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Selection */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Service Required
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl text-sm transition-all outline-none border cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-white/10 text-white focus:border-blue-400'
                            : 'bg-white border-black/10 text-neutral-900 focus:border-blue-500'
                        }`}
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="Custom Project">Custom Project / Other</option>
                      </select>
                    </div>

                    {/* Budget Selection */}
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl text-sm transition-all outline-none border cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-white/10 text-white focus:border-blue-400'
                            : 'bg-white border-black/10 text-neutral-900 focus:border-blue-500'
                        }`}
                      >
                        <option value="$5 – $25 (Quick Task)">$5 – $25 (Quick Task)</option>
                        <option value="$25 – $75 (Standard Project)">$25 – $75 (Standard Project)</option>
                        <option value="$75 – $200 (Full Solution)">$75 – $200 (Full Solution)</option>
                        <option value="$200+ (Ongoing / Custom)">$200+ (Ongoing / Custom)</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="contact-details"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Project Details & Requirements *
                    </label>
                    <textarea
                      id="contact-details"
                      name="projectDetails"
                      rows={4}
                      required
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Describe your goals, reference links, preferred deadline, or any specific instructions..."
                      className={`w-full px-4 py-3 rounded-2xl text-sm transition-all outline-none border ${
                        theme === 'dark'
                          ? 'bg-white/[0.04] border-white/10 text-white placeholder-neutral-500 focus:border-blue-400 focus:bg-white/[0.07]'
                          : 'bg-black/[0.03] border-black/10 text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-inquiry"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-white glass-button-primary disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Opening Direct Email...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Direct Email Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-400">
                    Directly addresses to <span className="text-neutral-200 font-mono">{socialLinks.email}</span> with pre-filled scope.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
