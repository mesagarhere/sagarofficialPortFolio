import React, { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  MapPin,
  Clock,
  Languages,
  CheckCircle2,
  FileText,
  Download,
  Sparkles,
  Award,
  Phone,
  GraduationCap,
  Camera,
  Check,
  Edit3,
  ShieldCheck
} from 'lucide-react';

export const About: React.FC = () => {
  const {
    data,
    theme,
    openCvModal,
    uploadExactProfilePhoto,
    isAdminAuthenticated,
    openAdminStudio
  } = usePortfolio();
  const { personalInfo } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const res = await uploadExactProfilePhoto(file);
    setIsUploading(false);
    if (res.success) {
      setToast(true);
      setTimeout(() => setToast(false), 4000);
    }
  };

  const handleDownloadCv = () => {
    // Open printable/viewable CV modal or trigger print
    openCvModal();
  };

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Profile & Background</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h2
              id="about-heading"
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
            >
              About Me
            </h2>
            {isAdminAuthenticated && (
              <button
                type="button"
                id="btn-about-admin-edit"
                onClick={() => openAdminStudio('personal')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md cursor-pointer"
                title="Edit Bio & Personal Info"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Info</span>
              </button>
            )}
          </div>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Get to know my journey, disciplines, and commitment to delivering exceptional digital results.
          </p>
        </div>

        {/* Large Transparent Glass About Card */}
        <div
          id="about-glass-card"
          className="relative rounded-3xl p-6 sm:p-10 glass-panel border border-white/15 shadow-2xl overflow-hidden"
        >
          {/* Subtle Corner Glow Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Mini profile picture & quick facts */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />

              <div
                className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-2 glass-panel border border-white/20 shadow-xl mb-3 ${
                  isAdminAuthenticated ? 'group cursor-pointer' : ''
                }`}
                onClick={() => {
                  if (isAdminAuthenticated) {
                    fileInputRef.current?.click();
                  }
                }}
                title={isAdminAuthenticated ? "Admin: Click to set your exact photo" : personalInfo.name}
              >
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_20%] rounded-2xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash')) {
                      target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                />

                {/* Hover Overlay with Camera Icon - ONLY for authenticated Admin */}
                {isAdminAuthenticated && (
                  <div className="absolute inset-2 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1">
                    <Camera className="w-5 h-5 text-blue-400" />
                    <span>{isUploading ? 'Setting...' : 'Set Exact Photo'}</span>
                  </div>
                )}

                {/* Camera Button Badge - ONLY for authenticated Admin */}
                {isAdminAuthenticated && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="absolute bottom-1 right-1 p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg border-2 border-neutral-900 transition-transform hover:scale-110 cursor-pointer"
                    title="Upload exact photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {toast && (
                <div className="mb-3 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Exact photo set!</span>
                </div>
              )}

              {/* Admin-Only Photo & Bio Action Buttons */}
              {isAdminAuthenticated && (
                <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 transition-all cursor-pointer"
                  >
                    <Camera className="w-3 h-3 text-blue-400" />
                    <span>Change Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAdminStudio('personal')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3 text-emerald-400" />
                    <span>Edit Bio</span>
                  </button>
                </div>
              )}

              {/* Quick Details Badges */}
              <div className="w-full space-y-2.5">
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel text-xs">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Location
                  </span>
                  <span className="font-semibold text-neutral-200">
                    {personalInfo.location}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel text-xs">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Experience
                  </span>
                  <span className="font-semibold text-neutral-200">
                    {personalInfo.experience}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel text-xs">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                    Education
                  </span>
                  <span className="font-semibold text-neutral-200 truncate ml-2">
                    Bachelor CS (Cont.)
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel text-xs">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <Languages className="w-3.5 h-3.5 text-purple-400" />
                    Languages
                  </span>
                  <span className="font-semibold text-neutral-200">
                    {personalInfo.languages.join(', ')}
                  </span>
                </div>

                {personalInfo.phone && (
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel text-xs">
                    <span className="flex items-center gap-2 text-neutral-400">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-400 hover:underline"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Extended Bio & Specialties */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold tracking-tight mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  Turning Ideas Into Code & Creative Experiences
                </h3>
                {/* Extended Bio */}
                <p
                  id="about-extended-bio"
                  className={`text-base sm:text-lg leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}
                >
                  {personalInfo.extendedBio}
                </p>

                {/* Editable More About Me area */}
                {personalInfo.moreAboutMe && (
                  <p
                    id="about-more-me"
                    className={`text-sm sm:text-base leading-relaxed p-4 rounded-2xl border ${
                      theme === 'dark'
                        ? 'bg-white/[0.03] border-white/10 text-neutral-300'
                        : 'bg-black/[0.02] border-black/5 text-neutral-600'
                    }`}
                  >
                    {personalInfo.moreAboutMe}
                  </p>
                )}
              </div>

              {/* Main Specialties */}
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400 mb-3 block">
                  Core Specialties
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {personalInfo.mainSpecialties.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl glass-panel border border-white/10 text-xs font-medium text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Expertise */}
              <div className="mb-8">
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3 block">
                  Other Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.otherExpertise.map((exp, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs font-medium glass-pill text-neutral-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* CV Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  id="about-btn-view-cv"
                  onClick={openCvModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white glass-button-primary cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View CV</span>
                </button>

                <button
                  type="button"
                  id="about-btn-download-cv"
                  onClick={handleDownloadCv}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold glass-button-secondary cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download My CV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
