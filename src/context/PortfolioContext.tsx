import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  INITIAL_PORTFOLIO_DATA,
  PersonalInfo,
  SkillItem,
  ServiceItem,
  ProjectItem,
  StatisticItem,
  TestimonialItem,
  PricingTier,
  SocialLinks,
  ContactInfo
} from '../data/portfolioData';

export type ActivePage = 'home' | 'content' | 'services' | 'about' | 'contact' | 'all';

export type AdminStudioTab =
  | 'personal'
  | 'projects'
  | 'services'
  | 'statistics'
  | 'testimonials'
  | 'socials'
  | 'backup';

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSkills: (skills: SkillItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  addProject: (project: ProjectItem) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (projectId: string) => void;
  updateStatistics: (statistics: StatisticItem[]) => void;
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  addTestimonial: (testimonial: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  updatePricing: (pricing: PricingTier[]) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => { success: boolean; error?: string };
  // Modals
  selectedCaseStudy: ProjectItem | null;
  openCaseStudy: (project: ProjectItem) => void;
  closeCaseStudy: () => void;
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  adminStudioTab: AdminStudioTab;
  setAdminStudioTab: (tab: AdminStudioTab) => void;
  openAdminStudio: (tab?: AdminStudioTab) => void;
  loginAdmin: (passcode: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  adminPasscode: string;
  changeAdminPasscode: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  adminRecoveryEmail: string;
  setAdminRecoveryEmail: (email: string) => void;
  sendAdminVerificationCode: (email?: string) => Promise<{ success: boolean; error?: string; email?: string; maskedEmail?: string; message?: string }>;
  verifyCodeAndResetPasscode: (code: string, newPasscode: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  uploadExactProfilePhoto: (file: File) => Promise<{ success: boolean; error?: string }>;
}

const STORAGE_KEY = 'sagar_portfolio_data_v3';
const THEME_KEY = 'sagar_portfolio_theme';
const ADMIN_PASSCODE_KEY = 'sagar_portfolio_admin_passcode';
const ADMIN_AUTH_KEY = 'sagar_portfolio_admin_auth';
const ADMIN_EMAIL_KEY = 'sagar_portfolio_admin_email';
const VERIFY_CODE_KEY = 'sagar_portfolio_verification_record';
const DEFAULT_ADMIN_PASSCODE = 'sagar2026';
const DEFAULT_ADMIN_EMAIL = 'mrsagar.0790@gmail.com';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initial data to ensure schema completeness
        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          personalInfo: { ...INITIAL_PORTFOLIO_DATA.personalInfo, ...(parsed.personalInfo || {}) },
          socialLinks: { ...INITIAL_PORTFOLIO_DATA.socialLinks, ...(parsed.socialLinks || {}) },
          contactInfo: { ...INITIAL_PORTFOLIO_DATA.contactInfo, ...(parsed.contactInfo || {}) }
        };
      }
    } catch {
      // Fallback
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Ignore
    }
    return 'dark'; // default to deep dark liquid glass
  });

  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminStudioTab, setAdminStudioTab] = useState<AdminStudioTab>('personal');
  const [activePage, setActivePage] = useState<ActivePage>('all');
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    try {
      return localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_ADMIN_PASSCODE;
    } catch {
      return DEFAULT_ADMIN_PASSCODE;
    }
  });

  const loginAdmin = (passcode?: string) => {
    const entered = (passcode || '').trim();

    if (!entered) {
      return {
        success: false,
        error: 'Please enter your admin passcode.'
      };
    }

    const current = adminPasscode.trim();

    // Check against current passcode
    const isMatch =
      entered === current ||
      entered.toLowerCase() === current.toLowerCase();

    if (isMatch) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {}
      setIsAdminLoginOpen(false);
      setIsAdminOpen(true);
      return { success: true };
    }

    return {
      success: false,
      error: 'Incorrect passcode. Please check your passcode and try again.'
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {}
    setIsAdminOpen(false);
  };

  const changeAdminPasscode = (oldPass: string, newPass: string) => {
    const cleanOld = (oldPass || '').trim();
    const cleanNew = (newPass || '').trim();
    const current = adminPasscode.trim();

    // If user is already authenticated inside the Admin Studio, allow them to change
    // or verify old passcode with case-insensitive tolerance
    if (cleanOld) {
      const isOldCorrect =
        cleanOld === current ||
        cleanOld.toLowerCase() === current.toLowerCase();

      if (!isOldCorrect && !isAdminAuthenticated) {
        return { success: false, error: 'Current passcode is incorrect.' };
      }
    } else if (!isAdminAuthenticated) {
      return { success: false, error: 'Please enter your current passcode.' };
    }

    if (!cleanNew || cleanNew.length < 4) {
      return { success: false, error: 'New passcode must be at least 4 characters long.' };
    }

    if (cleanNew.length > 50) {
      return { success: false, error: 'New passcode must be under 50 characters.' };
    }

    try {
      localStorage.setItem(ADMIN_PASSCODE_KEY, cleanNew);
      setAdminPasscode(cleanNew);
      return { success: true };
    } catch {
      return { success: false, error: 'Could not save new passcode to storage.' };
    }
  };

  const [adminRecoveryEmail, setAdminRecoveryEmailState] = useState<string>(() => {
    try {
      return localStorage.getItem(ADMIN_EMAIL_KEY) || DEFAULT_ADMIN_EMAIL;
    } catch {
      return DEFAULT_ADMIN_EMAIL;
    }
  });

  const setAdminRecoveryEmail = (email: string) => {
    const clean = (email || '').trim().toLowerCase();
    setAdminRecoveryEmailState(clean);
    try {
      localStorage.setItem(ADMIN_EMAIL_KEY, clean);
    } catch {}
  };

  const sendAdminVerificationCode = async (email?: string) => {
    const targetEmail = (email || adminRecoveryEmail).trim().toLowerCase();
    if (email) setAdminRecoveryEmail(targetEmail);

    try {
      const res = await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return {
          success: true,
          email: targetEmail,
          maskedEmail: data.maskedEmail,
          message: data.message,
        };
      }
      return {
        success: false,
        email: targetEmail,
        error: data.error || 'Could not send verification code to owner email.',
      };
    } catch (err) {
      console.error('Verification code dispatch failed:', err);
      return {
        success: false,
        email: targetEmail,
        error: 'Network error connecting to verification service. Please try again.',
      };
    }
  };

  const verifyCodeAndResetPasscode = async (
    code: string,
    newPasscode: string,
    email?: string
  ) => {
    const targetEmail = (email || adminRecoveryEmail).trim().toLowerCase();
    const cleanCode = (code || '').trim();
    const cleanPasscode = (newPasscode || '').trim();

    if (!cleanCode) {
      return { success: false, error: 'Please enter the 6-digit verification code.' };
    }
    if (!cleanPasscode || cleanPasscode.length < 4) {
      return { success: false, error: 'New passcode must be at least 4 characters long.' };
    }

    try {
      const res = await fetch('/api/auth/verify-code-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          code: cleanCode,
          newPasscode: cleanPasscode,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem(ADMIN_PASSCODE_KEY, cleanPasscode);
        setAdminPasscode(cleanPasscode);
        setIsAdminAuthenticated(true);
        try {
          localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        } catch {}
        setIsAdminOpen(true);
        setIsAdminLoginOpen(false);
        return { success: true };
      }
      return {
        success: false,
        error: data.error || 'Incorrect verification code. Please check your admin email.',
      };
    } catch (err) {
      console.error('Verification error:', err);
      return {
        success: false,
        error: 'Network error verifying code. Please try again.',
      };
    }
  };

  const openAdminStudio = (tab?: AdminStudioTab) => {
    if (tab) {
      setAdminStudioTab(tab);
    }
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Keyboard shortcut Ctrl+Shift+A or Alt+A to open Admin Login / Studio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))
      ) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setIsAdminOpen(prev => !prev);
        } else {
          setIsAdminLoginOpen(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  const handleSetActivePage = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota
    }
  }, [data]);

  // Sync theme to document & localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const uploadExactProfilePhoto = async (file: File): Promise<{ success: boolean; error?: string }> => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return { success: false, error: 'Admin authorization required. Only Sagar D. can edit or update the portfolio.' };
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        if (!dataUrl) {
          resolve({ success: false, error: 'Could not read image file' });
          return;
        }

        // 1. Immediately update UI state in real-time
        updatePersonalInfo({ profilePhoto: dataUrl });

        // 2. Persist to server backend disk
        try {
          await fetch('/api/upload-profile-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: dataUrl }),
          });
        } catch (err) {
          console.warn('Backend photo persist note:', err);
        }

        resolve({ success: true });
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Failed to read file from disk' });
      };
      reader.readAsDataURL(file);
    });
  };

  const updateSkills = (skills: SkillItem[]) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({ ...prev, skills }));
  };

  const updateServices = (services: ServiceItem[]) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({ ...prev, services }));
  };

  const updateProjects = (projects: ProjectItem[]) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({ ...prev, projects }));
  };

  const addProject = (project: ProjectItem) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  };

  const updateProject = (updated: ProjectItem) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === updated.id ? updated : p))
    }));
    if (selectedCaseStudy?.id === updated.id) {
      setSelectedCaseStudy(updated);
    }
  };

  const deleteProject = (projectId: string) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
    if (selectedCaseStudy?.id === projectId) {
      setSelectedCaseStudy(null);
    }
  };

  const updateStatistics = (statistics: StatisticItem[]) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({ ...prev, statistics }));
  };

  const updateTestimonials = (testimonials: TestimonialItem[]) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({ ...prev, testimonials }));
  };

  const addTestimonial = (testimonial: TestimonialItem) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      testimonials: [testimonial, ...prev.testimonials]
    }));
  };

  const deleteTestimonial = (id: string) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const updatePricing = (pricing: PricingTier[]) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({ ...prev, pricing }));
  };

  const updateSocialLinks = (links: Partial<SocialLinks>) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, ...links }
    }));
  };

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...info }
    }));
  };

  const resetToDefaults = () => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return;
    }
    setData(INITIAL_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const exportDataJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string) => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginOpen(true);
      return { success: false, error: 'Admin authorization required.' };
    }
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON format' };
      }
      setData({
        ...INITIAL_PORTFOLIO_DATA,
        ...parsed
      });
      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'JSON parse error';
      return { success: false, error: errorMsg };
    }
  };

  const openCaseStudy = (project: ProjectItem) => {
    setSelectedCaseStudy(project);
  };

  const closeCaseStudy = () => {
    setSelectedCaseStudy(null);
  };

  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        activePage,
        setActivePage: handleSetActivePage,
        updatePersonalInfo,
        updateSkills,
        updateServices,
        updateProjects,
        addProject,
        updateProject,
        deleteProject,
        updateStatistics,
        updateTestimonials,
        addTestimonial,
        deleteTestimonial,
        updatePricing,
        updateSocialLinks,
        updateContactInfo,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        selectedCaseStudy,
        openCaseStudy,
        closeCaseStudy,
        isCvModalOpen,
        openCvModal,
        closeCvModal,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        adminStudioTab,
        setAdminStudioTab,
        openAdminStudio,
        loginAdmin,
        logoutAdmin,
        adminPasscode,
        changeAdminPasscode,
        adminRecoveryEmail,
        setAdminRecoveryEmail,
        sendAdminVerificationCode,
        verifyCodeAndResetPasscode,
        uploadExactProfilePhoto
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
