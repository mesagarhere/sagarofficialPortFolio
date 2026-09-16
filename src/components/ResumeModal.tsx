import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Download,
  MapPin,
  Mail,
  ExternalLink,
  Phone,
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Code2,
  Video,
  Camera,
  Bot,
  Flame,
  Github,
  Linkedin
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isCvModalOpen, closeCvModal, data, theme } = usePortfolio();

  if (!isCvModalOpen) return null;

  const { personalInfo, skills, socialLinks } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="cv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeCvModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-heading"
    >
      <div
        id="cv-modal-card"
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 md:p-10 glass-panel border border-white/20 shadow-2xl my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Actions: Print & Close */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Curriculum Vitae
            </span>
            <span className="text-xs text-neutral-400">• Official Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="cv-print-button"
              onClick={handlePrint}
              aria-label="Print or Save CV as PDF"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-panel text-neutral-200 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              id="cv-close-button"
              onClick={closeCvModal}
              aria-label="Close CV preview"
              className="p-1.5 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div id="printable-resume-body" className="space-y-7">
          {/* Header */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-5 pb-6 border-b border-white/10">
            <div className="space-y-2.5">
              <div>
                <h1
                  id="cv-modal-heading"
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {personalInfo.name.toUpperCase()}
                </h1>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mt-1">
                  Digital Content Creator | Web Developer & CS Student
                </p>
              </div>

              {/* Direct Contacts Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {personalInfo.location}
                </span>

                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  {socialLinks.email}
                </a>

                {personalInfo.phone && (
                  <a
                    href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-400 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {personalInfo.phone} (WhatsApp)
                  </a>
                )}
              </div>

              {/* Verified Profiles Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={socialLinks.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1dbf73]/20 border border-[#1dbf73]/40 text-[#1dbf73] hover:bg-[#1dbf73]/30 transition-colors"
                >
                  <Flame className="w-3 h-3" />
                  Fiverr Profile
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium glass-panel text-neutral-200 hover:text-white transition-colors"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium glass-panel text-neutral-200 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3 h-3 text-blue-400" />
                  LinkedIn
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg shrink-0 bg-neutral-900 mx-auto sm:mx-0">
              <img
                src={personalInfo.profilePhoto}
                alt={personalInfo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_20%]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('unsplash')) {
                    target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                  }
                }}
              />
            </div>
          </div>

          {/* About Me / Summary */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2 pb-1 border-b border-white/10">
              About Me
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {personalInfo.extendedBio}
            </p>
          </div>

          {/* 4 Core Focus Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-100 mb-1">
                <Video className="w-3.5 h-3.5 text-blue-400" />
                <span>Video Editing</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Professional video editing for YouTube, Reels & social media content with smooth pacing and color work.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-100 mb-1">
                <Camera className="w-3.5 h-3.5 text-purple-400" />
                <span>Photography & Retouching</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Photo editing, visual styling & retouching for digital branding, creator portraits and social media.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-100 mb-1">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web & Python Development</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Responsive websites and automation scripts using HTML, CSS, JavaScript, Python, and Flask.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-100 mb-1">
                <Bot className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Integration & Tools</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Using AI models (Gemini, ChatGPT, Claude, Kimi) to boost productivity, content creation, and code build speed.
              </p>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3 pb-1 border-b border-white/10 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Experience & Projects</span>
            </h3>

            <div className="space-y-4">
              {/* Experience Item 1 */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">
                      Self Project Building
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Management & Consistency • Pakistan
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded glass-panel text-emerald-400 w-fit">
                    2024 – Present
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Integrated AI tools (ChatGPT, GitHub Copilot, Gemini, Claude, Kimi) into daily workflow to improve productivity and content output quality in videos and photography.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Used AI tools to speed up coding, debug errors, and learn new web development concepts faster. Prompt engineering, edits, and automated scripting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Applied AI chatbots/tools to research and troubleshoot web development problems, improving build speed and code quality.</span>
                  </li>
                </ul>
              </div>

              {/* Experience Item 2 */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">
                      Video Editor, Website, etc.
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Self Experience & Partners • Pakistan
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded glass-panel text-blue-400 w-fit">
                    2020 – 2024
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Stayed current with trending content formats and editing styles to keep output fresh and competitive.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Collaborated informally with other creators to expand content ideas and improve production quality.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Managed end-to-end video production workflow – scripting, filming, editing, color correction, and final publishing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Edited and retouched photography for digital content; created engaging social media content that grew audience reach over a 2-year period.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3 pb-1 border-b border-white/10 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>Education</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-100">Bachelor Program (CS)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                    Continuing
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-medium">Bachelor in Computer Science</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Core CS foundations, programming, web systems, and applied AI.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-100">Intermediate</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-medium">Sindh Badin, Pakistan</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Pre-engineering / science foundation.
                </p>
              </div>
            </div>
          </div>

          {/* Tools & AI Systems */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2.5 pb-1 border-b border-white/10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tools & AI Workflows</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                'ChatGPT',
                'Google Gemini',
                'Claude',
                'Kimi',
                'GitHub Copilot',
                'AI Prompts & Edits',
                'Python 3',
                'Flask',
                'HTML5 & CSS3',
                'JavaScript',
                'Voice Generators',
                'AI Translators',
                'Video Editing Suites',
                'Photo Retouching'
              ].map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/10 text-neutral-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs">
              <span className="font-semibold text-neutral-300 block mb-1">Languages:</span>
              <span className="text-neutral-400">{personalInfo.languages.join(' • ')}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs">
              <span className="font-semibold text-neutral-300 block mb-1">Availability:</span>
              <span className="text-emerald-400 font-medium">{personalInfo.availabilityStatus}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-400 text-center sm:text-left">
            Contact Mr. Sagar directly at <span className="text-neutral-200 font-mono">{socialLinks.email}</span>
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
