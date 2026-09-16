import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Sliders,
  User,
  FolderGit2,
  Tag,
  BarChart3,
  MessageSquare,
  Share2,
  FileCode,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  Upload,
  Lock,
  LogOut,
  ShieldCheck,
  Key,
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Mail
} from 'lucide-react';
import { ProjectItem, TestimonialItem } from '../data/portfolioData';

type TabType =
  | 'personal'
  | 'projects'
  | 'services'
  | 'statistics'
  | 'testimonials'
  | 'socials'
  | 'backup'
  | 'security';

export const AdminStudioModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    logoutAdmin,
    adminPasscode,
    changeAdminPasscode,
    adminRecoveryEmail,
    setAdminRecoveryEmail,
    data,
    updatePersonalInfo,
    updateServices,
    updateProjects,
    addProject,
    deleteProject,
    updateStatistics,
    addTestimonial,
    deleteTestimonial,
    updateSocialLinks,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    theme,
    uploadExactProfilePhoto,
    adminStudioTab,
    setAdminStudioTab
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<TabType>(adminStudioTab || 'personal');

  useEffect(() => {
    if (adminStudioTab) {
      setActiveTab(adminStudioTab);
    }
  }, [adminStudioTab, isAdminOpen]);
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const adminPhotoFileRef = useRef<HTMLInputElement>(null);
  const [adminPhotoUploading, setAdminPhotoUploading] = useState(false);
  const [adminPhotoMsg, setAdminPhotoMsg] = useState<string | null>(null);

  // Admin Security Passcode State
  const [oldPasscode, setOldPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [showOldPasscode, setShowOldPasscode] = useState(false);
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [showConfirmPasscode, setShowConfirmPasscode] = useState(false);
  const [showCurrentPasscode, setShowCurrentPasscode] = useState(false);
  const [passcodeStatus, setPasscodeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Recovery Email State
  const [editingRecoveryEmail, setEditingRecoveryEmail] = useState(false);
  const [newRecoveryEmail, setNewRecoveryEmail] = useState('');
  const [recoveryEmailStatus, setRecoveryEmailStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Initialize recovery email
  useEffect(() => {
    if (adminRecoveryEmail) {
      setNewRecoveryEmail(adminRecoveryEmail);
    }
  }, [adminRecoveryEmail]);

  // New Project Form State
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    name: '',
    category: 'Web Development',
    type: 'Personal Project',
    featured: false,
    shortDescription: '',
    problem: '',
    myRole: '',
    toolsAndTechnologies: ['React', 'Tailwind CSS'],
    solution: '',
    features: ['Responsive UI', 'Clean Architecture'],
    screenshots: ['/sagar_profile.jpg'],
    finalResult: '',
    gitHubLink: '',
    liveLink: '',
    date: '2026'
  });

  // New Testimonial Form State
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<TestimonialItem>>({
    clientName: '',
    clientRole: 'Creator / Client',
    business: 'Digital Brand',
    review: '',
    project: 'Web / Python Service',
    rating: 5,
    date: '2026'
  });

  // If not authenticated or not open, don't render modal (AdminBar handles floating status)
  if (!isAdminAuthenticated || !isAdminOpen) {
    return null;
  }

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode || newPasscode.trim().length < 4) {
      setPasscodeStatus({ success: false, message: 'New passcode must be at least 4 characters long.' });
      return;
    }
    if (newPasscode.trim() !== confirmPasscode.trim()) {
      setPasscodeStatus({ success: false, message: 'New passcode and confirmation do not match.' });
      return;
    }
    // Since the owner is already authenticated inside the Admin Studio,
    // they can change the passcode smoothly using oldPasscode or their active session
    const res = changeAdminPasscode(oldPasscode.trim() || adminPasscode, newPasscode.trim());
    if (res.success) {
      setPasscodeStatus({
        success: true,
        message: `Admin passcode changed to "${newPasscode.trim()}"! Use it for future logins.`
      });
      setOldPasscode('');
      setNewPasscode('');
      setConfirmPasscode('');
    } else {
      setPasscodeStatus({ success: false, message: res.error || 'Failed to update passcode.' });
    }
  };

  const handleSaveRecoveryEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecoveryEmail || !newRecoveryEmail.includes('@')) {
      setRecoveryEmailStatus({ success: false, message: 'Please enter a valid email address.' });
      return;
    }
    setAdminRecoveryEmail(newRecoveryEmail);
    setRecoveryEmailStatus({ success: true, message: 'Recovery email updated successfully.' });
    setEditingRecoveryEmail(false);
    setTimeout(() => setRecoveryEmailStatus(null), 3000);
  };



  const handleCopyJSON = () => {
    navigator.clipboard.writeText(exportDataJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJSON = () => {
    if (!jsonInput.trim()) return;
    const res = importDataJSON(jsonInput);
    if (res.success) {
      setImportStatus({ success: true, message: 'Configuration imported successfully!' });
      setJsonInput('');
    } else {
      setImportStatus({ success: false, message: res.error || 'Failed to import JSON' });
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.shortDescription) return;

    const projectToAdd: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: newProject.name || 'Untitled Project',
      category: (newProject.category as ProjectItem['category']) || 'Web Development',
      type: (newProject.type as ProjectItem['type']) || 'Personal Project',
      featured: Boolean(newProject.featured),
      shortDescription: newProject.shortDescription || '',
      problem: newProject.problem || 'Identified workflow friction.',
      myRole: newProject.myRole || 'Full Development & Execution',
      toolsAndTechnologies: newProject.toolsAndTechnologies || ['Python', 'Web'],
      solution: newProject.solution || 'Implemented a robust solution.',
      features: newProject.features || ['Feature 1', 'Feature 2'],
      screenshots: newProject.screenshots || ['/sagar_profile.jpg'],
      finalResult: newProject.finalResult || 'Delivered with 100% reliability.',
      gitHubLink: newProject.gitHubLink || '',
      liveLink: newProject.liveLink || '',
      date: newProject.date || '2026'
    };

    addProject(projectToAdd);
    setShowAddProject(false);
    setNewProject({
      name: '',
      category: 'Web Development',
      type: 'Personal Project',
      featured: false,
      shortDescription: '',
      problem: '',
      myRole: '',
      toolsAndTechnologies: ['React', 'Tailwind CSS'],
      solution: '',
      features: ['Responsive UI', 'Clean Architecture'],
      screenshots: ['/sagar_profile.jpg'],
      finalResult: '',
      gitHubLink: '',
      liveLink: '',
      date: '2026'
    });
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.clientName || !newTestimonial.review) return;

    const testimonialToAdd: TestimonialItem = {
      id: `test-${Date.now()}`,
      clientName: newTestimonial.clientName || 'Client',
      clientRole: newTestimonial.clientRole || 'Client',
      business: newTestimonial.business || 'Business',
      review: newTestimonial.review || '',
      project: newTestimonial.project || 'Freelance Service',
      rating: newTestimonial.rating || 5,
      date: newTestimonial.date || '2026'
    };

    addTestimonial(testimonialToAdd);
    setShowAddTestimonial(false);
    setNewTestimonial({
      clientName: '',
      clientRole: 'Creator / Client',
      business: 'Digital Brand',
      review: '',
      project: 'Web / Python Service',
      rating: 5,
      date: '2026'
    });
  };

  return (
    <div
      id="admin-studio-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-lg animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-studio-heading"
    >
      <div
        id="admin-studio-card"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col rounded-3xl glass-panel border border-white/20 shadow-2xl my-auto text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center glass-panel border border-white/20 text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="admin-studio-heading"
                className={`text-lg sm:text-xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}
              >
                Portfolio Admin Studio
              </h2>
              <p className="text-xs text-neutral-400">
                Instant live updates • No code rebuild required
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-modal-logout-admin"
              onClick={logoutAdmin}
              title="Lock and Log Out of Admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock & Log Out</span>
            </button>

            <button
              type="button"
              id="btn-close-admin-studio"
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close Admin Studio"
              className="p-2 rounded-full glass-panel text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-1 p-2 sm:px-6 bg-white/[0.02] border-b border-white/10 shrink-0">
          {[
            { key: 'personal', label: 'Personal Info', icon: User },
            { key: 'projects', label: 'Projects', icon: FolderGit2 },
            { key: 'services', label: 'Services', icon: Tag },
            { key: 'statistics', label: 'Statistics', icon: BarChart3 },
            { key: 'testimonials', label: 'Testimonials', icon: MessageSquare },
            { key: 'socials', label: 'Socials & Links', icon: Share2 },
            { key: 'backup', label: 'JSON Backup', icon: FileCode },
            { key: 'security', label: 'Admin Security', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'glass-panel text-white border-blue-400/40 bg-blue-500/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* TAB 1: PERSONAL INFO */}
          {activeTab === 'personal' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={data.personalInfo.professionalTitle}
                  onChange={(e) => updatePersonalInfo({ professionalTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Availability Badge Status
                </label>
                <input
                  type="text"
                  value={data.personalInfo.availabilityStatus}
                  onChange={(e) => updatePersonalInfo({ availabilityStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Profile Photo (Exact Photo Upload & Path)
                </label>

                {/* Direct File Picker */}
                <input
                  type="file"
                  ref={adminPhotoFileRef}
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setAdminPhotoUploading(true);
                    setAdminPhotoMsg(null);
                    const res = await uploadExactProfilePhoto(file);
                    setAdminPhotoUploading(false);
                    if (res.success) {
                      setAdminPhotoMsg('Exact photo updated & saved successfully!');
                      setTimeout(() => setAdminPhotoMsg(null), 4000);
                    } else {
                      setAdminPhotoMsg('Failed to update: ' + (res.error || 'Unknown error'));
                    }
                  }}
                />

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 mb-2">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shrink-0">
                    <img
                      src={data.personalInfo.profilePhoto}
                      alt="Current profile"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => adminPhotoFileRef.current?.click()}
                        disabled={adminPhotoUploading}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{adminPhotoUploading ? 'Saving...' : 'Upload Exact Photo (WhatsApp/Local)'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 truncate">
                      Select your original photo file directly to display without changes.
                    </p>
                    {adminPhotoMsg && (
                      <p className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {adminPhotoMsg}
                      </p>
                    )}
                  </div>
                </div>

                <input
                  type="text"
                  value={data.personalInfo.profilePhoto}
                  onChange={(e) => updatePersonalInfo({ profilePhoto: e.target.value })}
                  placeholder="/sagar_profile.jpg or data URL"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  Current path or base64 data string. You can also paste an external image link.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Extended Bio (About Me)
                </label>
                <textarea
                  rows={3}
                  value={data.personalInfo.extendedBio}
                  onChange={(e) => updatePersonalInfo({ extendedBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  More About Me (Editable note)
                </label>
                <textarea
                  rows={2}
                  value={data.personalInfo.moreAboutMe}
                  onChange={(e) => updatePersonalInfo({ moreAboutMe: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Manage Projects ({data.projects.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Add Project Form */}
              {showAddProject && (
                <form
                  onSubmit={handleCreateProject}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-blue-400/30 space-y-4"
                >
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-blue-400" />
                    New Project Case Study
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        placeholder="e.g. Real-Time Web Scraper"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Category
                      </label>
                      <select
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            category: e.target.value as ProjectItem['category']
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-900 border border-white/10 text-white outline-none"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Python">Python</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="AI Video">AI Video</option>
                        <option value="AI Animation">AI Animation</option>
                        <option value="Thumbnails">Thumbnails</option>
                        <option value="Posters">Posters</option>
                        <option value="Content Creation">Content Creation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={newProject.shortDescription}
                      onChange={(e) =>
                        setNewProject({ ...newProject, shortDescription: e.target.value })
                      }
                      placeholder="High-level overview of the project and deliverables..."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Problem / Challenge
                      </label>
                      <input
                        type="text"
                        value={newProject.problem}
                        onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                        placeholder="What obstacle was being faced?"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Solution / Outcome
                      </label>
                      <input
                        type="text"
                        value={newProject.solution}
                        onChange={(e) => setNewProject({ ...newProject, solution: e.target.value })}
                        placeholder="How did you solve it?"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        GitHub Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={newProject.gitHubLink}
                        onChange={(e) =>
                          setNewProject({ ...newProject, gitHubLink: e.target.value })
                        }
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Live Demo URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={newProject.liveLink}
                        onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-semibold text-white glass-button-primary"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{proj.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate max-w-md mt-0.5">
                        {proj.shortDescription}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteProject(proj.id)}
                      aria-label={`Delete project ${proj.name}`}
                      className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Services Pricing & Delivery Times
              </span>
              <div className="space-y-3">
                {data.services.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{srv.name}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">
                          Starting Price
                        </label>
                        <input
                          type="text"
                          value={srv.startingPrice}
                          onChange={(e) => {
                            const updated = [...data.services];
                            updated[idx].startingPrice = e.target.value;
                            updateServices(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/40 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">
                          Delivery Time
                        </label>
                        <input
                          type="text"
                          value={srv.estimatedDeliveryTime}
                          onChange={(e) => {
                            const updated = [...data.services];
                            updated[idx].estimatedDeliveryTime = e.target.value;
                            updateServices(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/40 border border-white/10 text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STATISTICS */}
          {activeTab === 'statistics' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Statistics Cards (Honest Metrics)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.statistics.map((stat, idx) => (
                  <div
                    key={stat.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
                  >
                    <label className="block text-xs font-semibold text-blue-400">
                      {stat.label}
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...data.statistics];
                        updated[idx].value = e.target.value;
                        updateStatistics(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                    />
                    <input
                      type="text"
                      value={stat.description}
                      onChange={(e) => {
                        const updated = [...data.statistics];
                        updated[idx].description = e.target.value;
                        updateStatistics(updated);
                      }}
                      placeholder="Description caption..."
                      className="w-full px-3 py-1.5 rounded-lg text-[11px] bg-black/20 border border-white/5 text-neutral-400 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Client Reviews ({data.testimonials.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddTestimonial(!showAddTestimonial)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              {showAddTestimonial && (
                <form
                  onSubmit={handleCreateTestimonial}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-blue-400/30 space-y-3"
                >
                  <h4 className="text-xs font-bold text-white">New Client Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newTestimonial.clientName}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, clientName: e.target.value })
                      }
                      placeholder="Client Name *"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                    />
                    <input
                      type="text"
                      value={newTestimonial.clientRole}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, clientRole: e.target.value })
                      }
                      placeholder="Role / Organization"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={newTestimonial.review}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, review: e.target.value })
                    }
                    placeholder="Review quote / feedback..."
                    className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTestimonial(false)}
                      className="px-3 py-1.5 text-xs text-neutral-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white glass-button-primary"
                    >
                      Save Review
                    </button>
                  </div>
                </form>
              )}

              {data.testimonials.length === 0 ? (
                <p className="text-xs text-neutral-400 italic p-4 rounded-xl bg-white/[0.02]">
                  No testimonials added yet. The public section is currently showing the honest placeholder state: "Client testimonials will appear here as I complete more projects."
                </p>
              ) : (
                <div className="space-y-3">
                  {data.testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {t.clientName} ({t.clientRole})
                        </span>
                        <p className="text-[11px] text-neutral-400 italic mt-0.5">"{t.review}"</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteTestimonial(t.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SOCIALS & LINKS */}
          {activeTab === 'socials' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Centralized Social Links Configuration
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={data.socialLinks.email}
                    onChange={(e) => updateSocialLinks({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Fiverr Profile URL
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.fiverr}
                    onChange={(e) => updateSocialLinks({ fiverr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.github}
                    onChange={(e) => updateSocialLinks({ github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.linkedin}
                    onChange={(e) => updateSocialLinks({ linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={data.socialLinks.instagram}
                    onChange={(e) => updateSocialLinks({ instagram: e.target.value })}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={data.socialLinks.whatsapp}
                    onChange={(e) => updateSocialLinks({ whatsapp: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: JSON BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  Export Centralized Portfolio Configuration
                </h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Copy your customized data to paste into <code>portfolioData.ts</code> or back up your configurations.
                </p>
                <button
                  type="button"
                  onClick={handleCopyJSON}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Config JSON'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-400" />
                  Import JSON Configuration
                </h4>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste valid PortfolioData JSON here..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none mb-3 font-mono"
                />
                <button
                  type="button"
                  onClick={handleImportJSON}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold glass-button-secondary cursor-pointer"
                >
                  <span>Apply Imported JSON</span>
                </button>

                {importStatus && (
                  <p
                    className={`text-xs mt-2 ${
                      importStatus.success ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {importStatus.message}
                  </p>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-rose-300">Reset to Default Settings</h4>
                  <p className="text-[11px] text-neutral-400">
                    Revert all values back to the original template defaults.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: ADMIN SECURITY & PASSCODE */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Status Banner */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">Admin Protection Active</h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    Customization is <strong>restricted exclusively to you (Sagar D.)</strong>. Regular visitors cannot edit your bio, projects, services, or testimonials.
                  </p>
                </div>
              </div>

              {/* Current Passcode Info & Reset Option */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Current Active Passcode</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm px-3 py-1 rounded-xl bg-black/50 border border-white/15 text-white tracking-widest">
                      {showCurrentPasscode ? adminPasscode : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCurrentPasscode(!showCurrentPasscode)}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                      title={showCurrentPasscode ? 'Hide passcode' : 'Reveal current passcode'}
                    >
                      {showCurrentPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showCurrentPasscode ? 'Hide' : 'Reveal'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Change Passcode Form Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  Set New Admin Passcode
                </h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Choose a memorable secret passcode to unlock your portfolio editor.
                </p>

                <form onSubmit={handleChangePasscode} className="space-y-3.5 max-w-md">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-neutral-300">
                        Current Passcode
                      </label>
                      <button
                        type="button"
                        onClick={() => setOldPasscode(adminPasscode)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        Autofill Current
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showOldPasscode ? 'text' : 'password'}
                        value={oldPasscode}
                        onChange={(e) => setOldPasscode(e.target.value)}
                        placeholder={`e.g. ${adminPasscode}`}
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPasscode(!showOldPasscode)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        {showOldPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      New Passcode (Min 4 characters)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPasscode ? 'text' : 'password'}
                        value={newPasscode}
                        onChange={(e) => {
                          setNewPasscode(e.target.value);
                          if (passcodeStatus) setPasscodeStatus(null);
                        }}
                        placeholder="Type new passcode..."
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPasscode(!showNewPasscode)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        {showNewPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Confirm New Passcode
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPasscode ? 'text' : 'password'}
                        value={confirmPasscode}
                        onChange={(e) => {
                          setConfirmPasscode(e.target.value);
                          if (passcodeStatus) setPasscodeStatus(null);
                        }}
                        placeholder="Re-enter new passcode..."
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPasscode(!showConfirmPasscode)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        {showConfirmPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {passcodeStatus && (
                    <div
                      className={`p-3 rounded-xl flex items-start gap-2 text-xs font-medium ${
                        passcodeStatus.success
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {passcodeStatus.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <span>{passcodeStatus.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Save New Passcode</span>
                  </button>
                </form>
              </div>

              {/* Recovery Email Card (Owner Only) */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Owner Recovery Email</span>
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Owner Only</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-3.5 leading-relaxed">
                  Verification codes are sent directly and exclusively to your owner email address whenever you reset your passcode.
                </p>
                
                {editingRecoveryEmail ? (
                  <form onSubmit={handleSaveRecoveryEmail} className="mt-3 space-y-3">
                    <div>
                      <input
                        type="email"
                        value={newRecoveryEmail}
                        onChange={(e) => setNewRecoveryEmail(e.target.value)}
                        placeholder="Enter new recovery email..."
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                      >
                        Save Email
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRecoveryEmail(false);
                          setNewRecoveryEmail(adminRecoveryEmail);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/15 max-w-md">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-white">{adminRecoveryEmail}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-[10px] text-neutral-400">Verified Owner & Exclusive Recipient</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingRecoveryEmail(true)}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                )}
                
                {recoveryEmailStatus && (
                  <div className={`mt-3 p-2.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 ${
                    recoveryEmailStatus.success ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
                  }`}>
                    {recoveryEmailStatus.success ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{recoveryEmailStatus.message}</span>
                  </div>
                )}
              </div>

              {/* Log Out & Lock Studio */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-rose-400" />
                    Lock & Exit Admin Mode
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Locks the studio and returns the portfolio to visitor view.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logoutAdmin}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock Studio Now</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between bg-black/20 shrink-0">
          <span className="text-[11px] text-neutral-400">
            All edits are automatically saved to your browser storage.
          </span>
          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 rounded-full text-xs font-semibold text-white glass-button-primary cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
