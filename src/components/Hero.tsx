import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard3D } from './TiltCard3D';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Globe,
  Bot,
  Video,
  Palette,
  ExternalLink,
  Flame,
  User,
  Rotate3d,
  Layers,
  Camera,
  Upload,
  Check,
  Edit3,
  ShieldCheck,
  FolderPlus
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    data,
    theme,
    activePage,
    setActivePage,
    uploadExactProfilePhoto,
    isAdminAuthenticated,
    openAdminStudio
  } = usePortfolio();
  const { personalInfo, socialLinks } = data;
  const [hero3DMode, setHero3DMode] = useState<'profile' | 'interactive3d'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPhoto(true);
    const res = await uploadExactProfilePhoto(file);
    setIsUploadingPhoto(false);
    if (res.success) {
      setUploadSuccessToast(true);
      setTimeout(() => setUploadSuccessToast(false), 4000);
    }
  };

  const scrollToSection = (id: string) => {
    if (activePage !== 'all') {
      if (id === 'portfolio') setActivePage('content');
      else if (id === 'contact') setActivePage('contact');
      else if (id === 'services') setActivePage('services');
      else if (id === 'about') setActivePage('about');
      else setActivePage('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const orbitTags = [
    { label: 'Python', icon: Code2, pos: '-top-3 -left-3 sm:-top-4 sm:-left-6' },
    { label: 'Web Dev', icon: Globe, pos: 'top-1/4 -right-4 sm:-right-8' },
    { label: 'AI Video', icon: Bot, pos: '-bottom-3 -right-2 sm:-bottom-4 sm:-right-6' },
    { label: 'Video Edit', icon: Video, pos: 'bottom-1/4 -left-4 sm:-left-8' },
    { label: 'Design', icon: Palette, pos: 'top-2 right-1/4' },
    { label: 'Content', icon: Sparkles, pos: 'bottom-1 left-1/4' }
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 sm:pt-40 sm:pb-28 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <div
              id="hero-availability-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass-pill mb-6 transition-transform hover:scale-105"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className={theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}>
                {personalInfo.availabilityStatus || 'Available for Freelance Projects'}
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-main-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
            >
              {personalInfo.heroHeading.split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {idx === 0 ? (
                    <span className={theme === 'dark' ? 'text-white' : 'text-neutral-950'}>
                      {line}
                    </span>
                  ) : (
                    <span
                      className={
                        theme === 'dark'
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-400'
                          : 'text-neutral-700'
                      }
                    >
                      {line}
                    </span>
                  )}
                </span>
              ))}
            </h1>

            {/* Professional Title Subtitle */}
            <div className="mb-4">
              <span
                id="hero-professional-title"
                className="inline-block text-sm sm:text-base font-semibold tracking-wide uppercase px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
              >
                {personalInfo.professionalTitle}
              </span>
            </div>

            {/* Description */}
            <p
              id="hero-description"
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              {personalInfo.heroDescription}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Primary CTA: View My Work */}
              <button
                type="button"
                id="hero-cta-view-work"
                onClick={() => scrollToSection('portfolio')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white glass-button-primary cursor-pointer shadow-lg"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Let's Work Together */}
              <button
                type="button"
                id="hero-cta-contact"
                onClick={() => scrollToSection('contact')}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold cursor-pointer border ${
                  theme === 'dark'
                    ? 'glass-button-secondary text-neutral-200 hover:text-white'
                    : 'bg-white/90 border-black/15 text-neutral-800 hover:bg-white hover:text-neutral-950 shadow-sm'
                }`}
              >
                <span>Let's Work Together</span>
              </button>

              {/* Additional CTA: Hire Me on Fiverr */}
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-fiverr"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold glass-button-fiverr cursor-pointer"
              >
                <Flame className="w-4 h-4 text-emerald-100" />
                <span>Hire Me on Fiverr</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Prominent Admin Controls Banner when Unlocked */}
            {isAdminAuthenticated && (
              <div
                id="hero-admin-banner"
                className="mt-6 p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 shadow-xl shadow-emerald-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Admin Unlocked (Owner: Sagar D.)
                    </p>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      You can edit all content, change your photo, or add projects.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    id="btn-hero-admin-edit-bio"
                    onClick={() => openAdminStudio('personal')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-neutral-950 flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Bio & Details</span>
                  </button>
                  <button
                    type="button"
                    id="btn-hero-admin-change-photo"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 border border-white/20 cursor-pointer transition-all"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-300" />
                    <span>Change Photo</span>
                  </button>
                  <button
                    type="button"
                    id="btn-hero-admin-manage-projects"
                    onClick={() => openAdminStudio('projects')}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white flex items-center gap-1.5 border border-white/15 cursor-pointer transition-all"
                  >
                    <FolderPlus className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Projects</span>
                  </button>
                </div>
              </div>
            )}

            {/* AI Assistant Quick Trigger if Sagar is busy */}
            <div className="mt-4">
              <button
                type="button"
                id="hero-trigger-ai"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('open-ai-assistant', {
                      detail: { query: '' }
                    })
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/25 text-blue-700 dark:text-blue-300 transition-all cursor-pointer group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <Bot className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Sagar might be coding? <strong>Ask 24/7 AI Agent</strong> for quick pricing & help</span>
              </button>
            </div>

            {/* Quick trust metrics indicator */}
            <div className={`mt-8 pt-6 border-t w-full flex items-center gap-6 text-xs ${
              theme === 'dark' ? 'border-white/10 text-neutral-400' : 'border-black/10 text-neutral-600'
            }`}>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Fast Turnaround (1–8 Days)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Starting from $5
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Verified Fiverr Creator
              </span>
            </div>
          </div>

          {/* Right Column: Premium Interactive 3D & Liquid Glass Profile */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            {/* 3D Mode Selector Toggle */}
            <div className="flex items-center gap-1 p-1 mb-4 rounded-full glass-panel border border-white/20 shadow-lg z-20">
              <button
                type="button"
                id="hero-toggle-profile-view"
                onClick={() => setHero3DMode('profile')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  hero3DMode === 'profile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </button>
              <button
                type="button"
                id="hero-toggle-3d-view"
                onClick={() => setHero3DMode('interactive3d')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  hero3DMode === 'interactive3d'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5 text-emerald-300 animate-spin-slow" />
                <span>Interactive 3D Core</span>
              </button>
            </div>

            <div
              id="hero-profile-container"
              className="relative w-full max-w-[340px] sm:max-w-[380px] group [perspective:1000px]"
            >
              {/* Outer soft ambient backlight */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

              {/* View 1: Creator Profile with 3D Tilt & Specular Physics */}
              {hero3DMode === 'profile' && (
                <TiltCard3D
                  maxTilt={8}
                  scale={1.015}
                  glare={true}
                  className="w-full"
                >
                  <div className="relative rounded-3xl p-5 sm:p-6 glass-panel border border-white/20 shadow-2xl transition-all duration-300">
                    {/* Hidden Native File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoFileChange}
                    />

                    {/* Profile Photo Wrapper with Apple Liquid Glass Ring & Drop Target */}
                    <div
                      className={`relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2.5 bg-gradient-to-b from-white/25 via-white/10 to-transparent shadow-inner [transform:translateZ(25px)] ${
                        isAdminAuthenticated ? 'cursor-pointer group/avatar' : ''
                      }`}
                      onClick={() => {
                        if (isAdminAuthenticated) {
                          fileInputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        if (isAdminAuthenticated) e.preventDefault();
                      }}
                      onDrop={async (e) => {
                        if (!isAdminAuthenticated) return;
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith('image/')) {
                          setIsUploadingPhoto(true);
                          const res = await uploadExactProfilePhoto(file);
                          setIsUploadingPhoto(false);
                          if (res.success) {
                            setUploadSuccessToast(true);
                            setTimeout(() => setUploadSuccessToast(false), 4000);
                          }
                        }
                      }}
                      title={isAdminAuthenticated ? "Admin: Click or drag & drop to set your exact photo" : personalInfo.name}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/30 shadow-xl bg-neutral-900">
                        <img
                          id="hero-profile-img"
                          src={personalInfo.profilePhoto}
                          alt={`${personalInfo.name} - ${personalInfo.professionalTitle}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes('unsplash')) {
                              target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                            }
                          }}
                        />

                        {/* Hover Overlay with Camera Icon - ONLY for authenticated Admin */}
                        {isAdminAuthenticated && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-xs font-semibold gap-1">
                            <Camera className="w-6 h-6 text-blue-400" />
                            <span>{isUploadingPhoto ? 'Setting...' : 'Set Exact Photo'}</span>
                          </div>
                        )}
                      </div>

                      {/* Camera Button Badge - ONLY for authenticated Admin */}
                      {isAdminAuthenticated && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="absolute bottom-2 right-2 p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl border-2 border-neutral-900 transition-transform hover:scale-110 cursor-pointer flex items-center justify-center z-10"
                          title="Admin: Upload exact photo"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      )}

                      {/* Specular glass reflection overlay */}
                      <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-70" />
                    </div>

                    {/* Success Toast */}
                    {uploadSuccessToast && (
                      <div className="mt-3 p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-1.5 animate-in fade-in">
                        <Check className="w-3.5 h-3.5" />
                        <span>Exact profile photo set successfully!</span>
                      </div>
                    )}

                    {/* Profile Info Bar */}
                    <div className="mt-5 text-center [transform:translateZ(20px)]">
                      <div className="flex items-center justify-center gap-2">
                        <h3
                          id="hero-profile-name"
                          className={`text-xl font-bold tracking-tight ${
                            theme === 'dark' ? 'text-white' : 'text-neutral-900'
                          }`}
                        >
                          {personalInfo.name}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">
                        {personalInfo.location} • {personalInfo.experience} Exp
                      </p>
                    </div>

                    {/* Micro tech pills */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap justify-center gap-1.5 [transform:translateZ(15px)]">
                      {personalInfo.mainSpecialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Admin-Only Editing Controls */}
                    {isAdminAuthenticated && (
                      <div className="mt-3.5 pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-center gap-2 [transform:translateZ(15px)]">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 transition-all cursor-pointer shadow-sm"
                        >
                          <Camera className="w-3.5 h-3.5 text-blue-400" />
                          <span>{isUploadingPhoto ? 'Setting...' : 'Change Photo'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openAdminStudio('personal')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all cursor-pointer shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Edit Hero Bio</span>
                        </button>
                      </div>
                    )}
                  </div>
                </TiltCard3D>
              )}

              {/* View 2: Interactive Real-Time 3D Tech Core */}
              {hero3DMode === 'interactive3d' && (
                <div className="relative rounded-3xl p-5 sm:p-6 glass-panel border border-emerald-500/30 shadow-2xl flex flex-col items-center justify-between min-h-[410px] animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-full flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      WebGL 3D Core Active
                    </span>
                    <span className="text-[11px] text-neutral-400">Drag to Spin</span>
                  </div>

                  <div className="w-full h-64 sm:h-72 my-1">
                    <ThreeHeroCanvas isInteractive={true} />
                  </div>

                  <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 text-[11px]">Dynamic 3D Geometry</span>
                    <button
                      type="button"
                      onClick={() => setHero3DMode('profile')}
                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold cursor-pointer"
                    >
                      Return to Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Floating Futuristic Orbiters representing Sagar's disciplines */}
              {orbitTags.map((tag, idx) => {
                const IconComponent = tag.icon;
                return (
                  <div
                    key={idx}
                    className={`absolute ${tag.pos} z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium glass-panel border border-white/20 shadow-lg text-neutral-200 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-blue-400 pointer-events-none sm:pointer-events-auto [transform:translateZ(30px)] animate-float-slow`}
                    style={{ animationDelay: `${idx * 0.4}s` }}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-blue-400" />
                    <span>{tag.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
