import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ShieldCheck,
  Edit3,
  Camera,
  FolderPlus,
  Sliders,
  LogOut,
  Sparkles
} from 'lucide-react';

export const AdminBar: React.FC = () => {
  const {
    isAdminAuthenticated,
    openAdminStudio,
    logoutAdmin,
    theme
  } = usePortfolio();

  if (!isAdminAuthenticated) return null;

  return (
    <aside
      id="admin-mode-floating-bar"
      aria-label="Admin Editing Toolbar"
      className="fixed top-20 sm:top-22 left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-2xl glass-panel border border-emerald-400/50 bg-neutral-950/90 backdrop-blur-2xl shadow-2xl shadow-black/80 flex items-center gap-2 sm:gap-3 text-white animate-in slide-in-from-top-4 duration-300 max-w-[96vw] overflow-x-auto"
    >
      {/* Admin Badge */}
      <div className="flex items-center gap-2 pr-2.5 border-r border-white/15 shrink-0">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold text-emerald-300 leading-tight flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Unlocked</span>
          </span>
          <span className="text-[9px] text-neutral-400 leading-tight hidden xs:inline">
            Sagar D. (Owner)
          </span>
        </div>
      </div>

      {/* Primary Edit Button */}
      <button
        type="button"
        id="btn-admin-bar-open-studio"
        onClick={() => openAdminStudio('personal')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md shadow-emerald-500/25 shrink-0 cursor-pointer"
        title="Open Full Admin Studio Editor"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit Portfolio</span>
      </button>

      {/* Quick Edit Actions */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => openAdminStudio('personal')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-neutral-200 hover:text-white cursor-pointer"
          title="Edit Profile Bio & Change Photo"
        >
          <Camera className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Photo & Bio</span>
          <span className="sm:hidden">Photo</span>
        </button>

        <button
          type="button"
          onClick={() => openAdminStudio('projects')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-neutral-200 hover:text-white cursor-pointer"
          title="Add or Edit Projects"
        >
          <FolderPlus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Projects</span>
        </button>

        <button
          type="button"
          onClick={() => openAdminStudio('services')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-neutral-200 hover:text-white cursor-pointer"
          title="Edit Services & Pricing"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Services</span>
        </button>
      </div>

      {/* Exit / Logout Action */}
      <div className="pl-2 border-l border-white/15 shrink-0">
        <button
          type="button"
          onClick={logoutAdmin}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
          title="Exit Admin Mode (Revert to Visitor View)"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Lock</span>
        </button>
      </div>
    </aside>
  );
};
