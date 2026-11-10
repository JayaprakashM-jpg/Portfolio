import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Certificate, Experience, SkillCategory, Profile } from '../../types';
import {
  LayoutDashboard,
  FolderGit2,
  Award,
  Briefcase,
  Layers,
  User,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Upload,
  Download,
  RotateCcw,
  Sun,
  Moon,
  Search,
  CheckCircle2,
  Eye,
  Mail,
  ShieldAlert,
  Globe,
  ArrowUpRight,
  Github,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    adminLogout,
    setCurrentView,
    activeTheme,
    setThemeSetting,
    themeSetting,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addExperience,
    updateExperience,
    deleteExperience,
    updateSkillCategories,
    updateEmailApiKey,
    markMessageAsRead,
    deleteMessage,
    changeAdminPassword,
    exportDataJson,
    importDataJson,
    resetToDefault,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'certificates' | 'experience' | 'skills' | 'profile' | 'settings'
  >('overview');

  // Modals for Create/Edit
  const [projectModal, setProjectModal] = useState<{ open: boolean; project?: Project }>({ open: false });
  const [certModal, setCertModal] = useState<{ open: boolean; cert?: Certificate }>({ open: false });
  const [expModal, setExpModal] = useState<{ open: boolean; exp?: Experience }>({ open: false });

  // Notification toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTheme = () => {
    if (themeSetting === 'dark') setThemeSetting('light');
    else if (themeSetting === 'light') setThemeSetting('dark');
    else setThemeSetting(activeTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-beige-light dark:bg-navy text-navy dark:text-beige-light flex flex-col md:flex-row transition-colors">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-navy text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-terracotta animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-olive" />
          <span>{toast}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-navy-surface border-r border-beige-border dark:border-navy-border p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-beige-border dark:border-navy-border">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-terracotta text-white flex items-center justify-center font-bold text-sm">
                JM
              </span>
              <div>
                <h1 className="text-sm font-bold font-display text-navy dark:text-beige-light leading-tight">
                  Admin Console
                </h1>
                <p className="text-[11px] text-olive font-mono">Jayaprakash M</p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-500 hover:text-navy dark:hover:text-beige-light hover:bg-beige-surface dark:hover:bg-navy"
              title="Toggle Theme"
            >
              {activeTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick link back to live site */}
          <div className="mt-4">
            <button
              onClick={() => {
                setCurrentView('public');
                window.location.hash = '';
              }}
              className="w-full py-2 px-3 rounded-lg bg-beige-light dark:bg-navy text-terracotta hover:bg-beige-surface text-xs font-semibold transition-colors flex items-center justify-between border border-beige-border dark:border-navy-border cursor-pointer"
            >
              <span>View Public Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="font-mono text-[10px] opacity-75">{data.projects.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'certificates'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>Certificates</span>
              </div>
              <span className="font-mono text-[10px] opacity-75">{data.certificates.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience & Education</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Skills Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile, Photo & Socials</span>
            </button>

            {/* Direct Gmail Launcher (Replaces Inquiries Inbox) */}
            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-olive hover:text-terracotta hover:bg-beige-surface dark:hover:bg-navy transition-colors"
              title="Open your official Gmail inbox"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta" />
                <span>Direct Gmail</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-terracotta text-white font-semibold'
                  : 'text-navy dark:text-beige hover:bg-beige-surface dark:hover:bg-navy'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Data & Backup</span>
            </button>
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        {activeTab === 'overview' && (
          <OverviewTab
            data={data}
            setActiveTab={setActiveTab}
            setProjectModal={setProjectModal}
            setCertModal={setCertModal}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTab
            projects={data.projects}
            setProjectModal={setProjectModal}
            deleteProject={(id) => {
              deleteProject(id);
              showToast('Project removed');
            }}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificatesTab
            certificates={data.certificates}
            setCertModal={setCertModal}
            deleteCertificate={(id) => {
              deleteCertificate(id);
              showToast('Certificate removed');
            }}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceTab
            experiences={data.experiences}
            setExpModal={setExpModal}
            deleteExperience={(id) => {
              deleteExperience(id);
              showToast('Experience removed');
            }}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsTab
            categories={data.skillCategories}
            updateSkillCategories={(cats) => {
              updateSkillCategories(cats);
              showToast('Skills matrix updated');
            }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            profile={data.profile}
            updateProfile={(p) => {
              updateProfile(p);
              showToast('Profile information saved');
            }}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            adminPassword={data.adminPassword}
            changeAdminPassword={(p) => {
              changeAdminPassword(p);
              showToast('Password updated');
            }}
            emailApiKey={data.emailApiKey || 'web3forms-portfolio-key'}
            updateEmailApiKey={(k) => {
              updateEmailApiKey(k);
              showToast('Email API key updated');
            }}
            exportDataJson={exportDataJson}
            importDataJson={(json) => {
              const res = importDataJson(json);
              showToast(res.message);
            }}
            resetToDefault={() => {
              resetToDefault();
              showToast('Restored default portfolio');
            }}
          />
        )}
      </main>

      {/* Project Add/Edit Modal */}
      {projectModal.open && (
        <ProjectEditorModal
          key={projectModal.project?.id || 'new-project'}
          initialProject={projectModal.project}
          onClose={() => setProjectModal({ open: false, project: undefined })}
          onSave={(proj) => {
            if (projectModal.project) {
              updateProject(proj as Project);
              showToast('Project updated successfully');
            } else {
              addProject(proj);
              showToast('Project added successfully');
            }
            setProjectModal({ open: false, project: undefined });
          }}
        />
      )}

      {/* Certificate Add/Edit Modal */}
      {certModal.open && (
        <CertificateEditorModal
          initialCert={certModal.cert}
          onClose={() => setCertModal({ open: false })}
          onSave={(cert) => {
            if (certModal.cert) {
              updateCertificate(cert as Certificate);
              showToast('Certificate updated successfully');
            } else {
              addCertificate(cert);
              showToast('Certificate added successfully');
            }
            setCertModal({ open: false });
          }}
        />
      )}

      {/* Experience Add/Edit Modal */}
      {expModal.open && (
        <ExperienceEditorModal
          initialExp={expModal.exp}
          onClose={() => setExpModal({ open: false })}
          onSave={(exp) => {
            if (expModal.exp) {
              updateExperience(exp as Experience);
              showToast('Experience updated successfully');
            } else {
              addExperience(exp);
              showToast('Experience added successfully');
            }
            setExpModal({ open: false });
          }}
        />
      )}
    </div>
  );
};

/* --- TAB 1: OVERVIEW --- */
const OverviewTab: React.FC<{
  data: ReturnType<typeof usePortfolio>['data'];
  setActiveTab: (t: any) => void;
  setProjectModal: (p: any) => void;
  setCertModal: (c: any) => void;
}> = ({ data, setActiveTab, setProjectModal, setCertModal }) => {
  const targetEmail = data.profile.email || 'mprakash102006@gmail.com';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-display text-navy dark:text-beige-light">
          Executive Portfolio Status
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-beige mt-1">
          Welcome back, Jayaprakash. Manage your projects, live website links, certifications, and profile settings.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs">
          <div className="text-xs text-olive font-medium">Projects Published</div>
          <div className="text-3xl font-bold font-mono mt-1 text-navy dark:text-beige-light">
            {data.projects.length}
          </div>
          <div className="text-[11px] text-terracotta mt-2 font-medium">
            {data.projects.filter((p) => p.featured).length} Featured on Home
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs">
          <div className="text-xs text-olive font-medium">Certificates & Awards</div>
          <div className="text-3xl font-bold font-mono mt-1 text-navy dark:text-beige-light">
            {data.certificates.length}
          </div>
          <div className="text-[11px] text-olive mt-2 font-medium">Photos Verified</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs">
          <div className="text-xs text-olive font-medium">Career Milestones</div>
          <div className="text-3xl font-bold font-mono mt-1 text-navy dark:text-beige-light">
            {data.experiences.length}
          </div>
          <div className="text-[11px] text-terracotta mt-2 font-medium">IBM Adroit & Anna Univ</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs">
          <div className="text-xs text-olive font-medium">Direct Inquiries Channel</div>
          <div className="text-sm font-bold font-mono mt-2 text-navy dark:text-beige-light truncate">
            {targetEmail}
          </div>
          <div className="text-[11px] text-terracotta mt-2 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-olive" />
            <span>Direct to Gmail</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-olive">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setProjectModal({ open: true })}
            className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project & Hosting URL</span>
          </button>

          <button
            onClick={() => setCertModal({ open: true })}
            className="px-4 py-2 text-xs font-semibold text-navy dark:text-beige bg-beige-light dark:bg-navy hover:bg-beige-surface border border-beige-border dark:border-navy-border rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4 text-terracotta" />
            <span>Upload Certificate Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="px-4 py-2 text-xs font-semibold text-navy dark:text-beige bg-beige-light dark:bg-navy hover:bg-beige-surface border border-beige-border dark:border-navy-border rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <User className="w-4 h-4 text-olive" />
            <span>Edit Profile, Photo & Socials</span>
          </button>
        </div>
      </div>

      {/* Direct Gmail Channel Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-border dark:border-navy-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta/10 text-terracotta">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-navy dark:text-beige-light">
                Direct Gmail Communication
              </h3>
              <p className="text-xs text-slate-500 dark:text-beige">
                Inquiries sent from the "Send a Direct Note" section are routed directly to your personal mailbox.
              </p>
            </div>
          </div>

          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Open {targetEmail} in Gmail</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border text-xs text-slate-600 dark:text-beige space-y-1.5">
          <div className="font-semibold text-navy dark:text-beige-light">How recruiter notes reach you:</div>
          <p>
            When recruiters or visitors complete the "Send a Direct Note" form, it launches an addressed message directly to <strong>{targetEmail}</strong> via Gmail Web or their system email client.
          </p>
        </div>
      </div>
    </div>
  );
};

/* --- TAB 2: PROJECTS MANAGEMENT --- */
const ProjectsTab: React.FC<{
  projects: Project[];
  setProjectModal: (p: any) => void;
  deleteProject: (id: string) => void;
}> = ({ projects, setProjectModal, deleteProject }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy dark:text-beige-light">
            Projects Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-beige mt-1">
            Create, edit, or delete portfolio projects and manage hosting URLs & GitHub repositories.
          </p>
        </div>

        <button
          onClick={() => setProjectModal({ open: true, project: undefined })}
          className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-16 h-12 object-cover rounded-xl border border-beige-border dark:border-navy-border shrink-0 bg-navy"
                onError={(e) => {
                  const target = e.currentTarget;
                  const filename = project.image.split('/').pop();
                  if (filename && !target.src.includes(`/images/${filename}`)) {
                    target.src = `/images/${filename}`;
                  }
                }}
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-navy dark:text-beige-light">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20">
                      Featured
                    </span>
                  )}
                  <span className="text-[11px] text-olive font-mono">({project.category})</span>
                  {project.hostingUrl && (
                    <a
                      href={project.hostingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-olive/10 text-olive hover:bg-olive hover:text-white border border-olive/30 transition-colors inline-flex items-center gap-1"
                      title="Open Live Website"
                    >
                      <Globe className="w-2.5 h-2.5" />
                      <span>Live Website</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-beige mt-0.5">{project.subtitle}</p>
                <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-slate-400 dark:text-beige/70 font-mono">
                  {Array.isArray(project.techStack) ? project.techStack.slice(0, 4).join(' · ') : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.hostingUrl && (
                <a
                  href={project.hostingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl text-olive hover:bg-olive/10 transition-colors"
                  title="Visit Live Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl text-slate-500 hover:text-navy dark:hover:text-beige-light hover:bg-beige-surface dark:hover:bg-navy transition-colors"
                  title="Source Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setProjectModal({ open: true, project })}
                className="px-3 py-1.5 rounded-xl text-navy dark:text-beige bg-beige-light dark:bg-navy hover:bg-beige-surface dark:hover:bg-navy-surface border border-beige-border dark:border-navy-border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Project"
              >
                <Edit2 className="w-3.5 h-3.5 text-terracotta" />
                <span>Edit</span>
              </button>

              {deletingId === project.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      deleteProject(project.id);
                      setDeletingId(null);
                    }}
                    className="px-2.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Delete?
                  </button>
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-300 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeletingId(project.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TAB 3: CERTIFICATES & PHOTO UPLOAD --- */
const CertificatesTab: React.FC<{
  certificates: Certificate[];
  setCertModal: (c: any) => void;
  deleteCertificate: (id: string) => void;
}> = ({ certificates, setCertModal, deleteCertificate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
            Certifications & Photos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload new certificate photos, update accreditation details, and verify credentials.
          </p>
        </div>

        <button
          onClick={() => setCertModal({ open: true })}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Certificate Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
                <img
                  src={cert.photoUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const filename = cert.photoUrl.split('/').pop();
                    if (filename && !target.src.includes(`/images/${filename}`)) {
                      target.src = `/images/${filename}`;
                    }
                  }}
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-mono">
                  {cert.category}
                </div>
              </div>

              <div className="p-4">
                <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">{cert.issuer}</div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{cert.title}</h3>
                <div className="text-xs text-slate-400 font-mono mt-1">{cert.issueDate}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{cert.description}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[120px]">
                {cert.credentialId || 'No ID'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCertModal({ open: true, cert })}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCertificate(cert.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TAB 4: EXPERIENCE & EDUCATION --- */
const ExperienceTab: React.FC<{
  experiences: Experience[];
  setExpModal: (e: any) => void;
  deleteExperience: (id: string) => void;
}> = ({ experiences, setExpModal, deleteExperience }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
            Experience & Education Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your professional internship roles and academic university background.
          </p>
        </div>

        <button
          onClick={() => setExpModal({ open: true })}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience / Degree</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-xs"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">@{exp.company}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {exp.duration} · {exp.location} · {exp.type}
              </div>
              <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                {exp.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setExpModal({ open: true, exp })}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteExperience(exp.id)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TAB 5: SKILLS MATRIX --- */
const SkillsTab: React.FC<{
  categories: SkillCategory[];
  updateSkillCategories: (cats: SkillCategory[]) => void;
}> = ({ categories, updateSkillCategories }) => {
  const [localCategories, setLocalCategories] = useState<SkillCategory[]>(categories);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  // Inline Add Skill State
  const [addingSkillToCatId, setAddingSkillToCatId] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState<'Proficient' | 'Advanced' | 'Intermediate'>('Proficient');

  // Add Category State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  const handleSaveSkill = (catId: string) => {
    if (!newSkillName.trim()) return;
    const name = newSkillName.trim();

    const updated = localCategories.map((c) => {
      if (c.id === catId) {
        if (c.skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
          return c;
        }
        return {
          ...c,
          skills: [...c.skills, { name, proficiency: newSkillProficiency }],
        };
      }
      return c;
    });

    setLocalCategories(updated);
    updateSkillCategories(updated);
    setNewSkillName('');
    setAddingSkillToCatId(null);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCat: SkillCategory = {
      id: 'cat-' + Date.now().toString(36),
      categoryName: newCategoryName.trim(),
      skills: [],
    };
    const updated = [...localCategories, newCat];
    setLocalCategories(updated);
    updateSkillCategories(updated);
    setNewCategoryName('');
    setIsAddingCategory(false);
    setAddingSkillToCatId(newCat.id);
  };

  const handleDeleteCategory = (catId: string) => {
    const updated = localCategories.filter((c) => c.id !== catId);
    setLocalCategories(updated);
    updateSkillCategories(updated);
    setDeletingCatId(null);
  };

  const handleRemoveSkill = (catId: string, skillName: string) => {
    const updated = localCategories.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: c.skills.filter((s) => s.name !== skillName),
        };
      }
      return c;
    });
    setLocalCategories(updated);
    updateSkillCategories(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy dark:text-beige-light">
            Skills & Competencies Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-beige mt-1">
            Add new technical skills, categorize proficiencies (Advanced, Proficient, Intermediate), and organize skill domains.
          </p>
        </div>

        <button
          onClick={() => setIsAddingCategory(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Category</span>
        </button>
      </div>

      {/* Add New Category Card */}
      {isAddingCategory && (
        <form
          onSubmit={handleCreateCategory}
          className="p-5 rounded-2xl bg-white dark:bg-navy-surface border-2 border-terracotta/40 shadow-md space-y-3 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy dark:text-beige-light">
              Create New Skill Category
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingCategory(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              autoFocus
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Cloud & DevOps, Database Systems, Core CS"
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-beige-border dark:border-navy-border bg-beige-light dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors cursor-pointer"
              >
                Create Category
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCategory(false)}
                className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-beige hover:bg-beige-surface rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {localCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-beige-border dark:border-navy-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold font-display text-navy dark:text-beige-light">
                    {cat.categoryName}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-olive/10 text-olive">
                    {cat.skills.length} skills
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAddingSkillToCatId(addingSkillToCatId === cat.id ? null : cat.id);
                      setNewSkillName('');
                    }}
                    className="text-xs text-terracotta hover:text-terracotta-dark font-semibold flex items-center gap-1 cursor-pointer bg-terracotta/10 px-2.5 py-1 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>

                  {deletingCatId === cat.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded cursor-pointer"
                      >
                        Delete?
                      </button>
                      <button
                        onClick={() => setDeletingCatId(null)}
                        className="text-[10px] text-slate-400 hover:text-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingCatId(cat.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Inline Add Skill Box */}
              {addingSkillToCatId === cat.id && (
                <div className="mt-3 p-3 rounded-xl bg-beige-light dark:bg-navy border border-terracotta/30 space-y-2.5 animate-in fade-in">
                  <div className="text-xs font-semibold text-navy dark:text-beige-light">
                    Add skill to {cat.categoryName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveSkill(cat.id);
                        }
                      }}
                      placeholder="e.g. Docker, PyTorch, LangChain, React"
                      className="sm:col-span-7 px-3 py-1.5 text-xs rounded-lg border border-beige-border dark:border-navy-border bg-white dark:bg-navy-surface text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
                    />
                    <select
                      value={newSkillProficiency}
                      onChange={(e) => setNewSkillProficiency(e.target.value as any)}
                      className="sm:col-span-5 px-2.5 py-1.5 text-xs rounded-lg border border-beige-border dark:border-navy-border bg-white dark:bg-navy-surface text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
                    >
                      <option value="Advanced">Advanced</option>
                      <option value="Proficient">Proficient</option>
                      <option value="Intermediate">Intermediate</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setAddingSkillToCatId(null)}
                      className="px-2.5 py-1 text-xs text-slate-500 hover:text-navy dark:hover:text-beige-light cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveSkill(cat.id)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-lg transition-colors cursor-pointer"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
              )}

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {cat.skills.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    No skills in this category yet. Click "Add Skill" above to insert.
                  </p>
                ) : (
                  cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 rounded-xl bg-beige-light dark:bg-navy text-navy dark:text-beige-light text-xs font-medium flex items-center gap-2 border border-beige-border dark:border-navy-border group hover:border-terracotta/40 transition-colors"
                    >
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-[10px] text-olive font-mono">
                        ({skill.proficiency})
                      </span>
                      <button
                        onClick={() => handleRemoveSkill(cat.id, skill.name)}
                        className="text-slate-400 hover:text-red-500 ml-0.5 cursor-pointer transition-colors"
                        title={`Remove ${skill.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TAB 6: PROFILE & RESUME --- */
const ProfileTab: React.FC<{
  profile: Profile;
  updateProfile: (p: Profile) => void;
}> = ({ profile, updateProfile }) => {
  const [formData, setFormData] = useState<Profile>({
    ...profile,
    socialLinks: {
      github: profile.socialLinks?.github || profile.github || '',
      linkedin: profile.socialLinks?.linkedin || profile.linkedin || '',
      instagram: profile.socialLinks?.instagram || '',
      twitter: profile.socialLinks?.twitter || '',
      leetcode: profile.socialLinks?.leetcode || '',
      kaggle: profile.socialLinks?.kaggle || '',
    },
  });

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({ ...prev, avatarUrl: event.target?.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      github: formData.socialLinks.github,
      linkedin: formData.socialLinks.linkedin,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
          Profile Photo & Social Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload your portrait photo, configure your social media profiles (LinkedIn, Instagram, GitHub), and adjust your bio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs"
      >
        {/* Profile Photo Uploader */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
            Profile Portrait Photo
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shrink-0 bg-slate-900 shadow-md">
              <img
                src={formData.avatarUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/images/profile_jayaprakash_portrait_1793369527676.jpg')) {
                    target.src = '/images/profile_jayaprakash_portrait_1793369527676.jpg';
                  }
                }}
              />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <div className="flex flex-wrap gap-2">
                <label className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Photo from Device</span>
                  <input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
                </label>
              </div>
              <div>
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="Or enter photo URL / asset path"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Supports JPG, PNG, WEBP. Uploaded photos are stored instantly in your portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Social Media Pages & Links
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/in/jayaprakash-m"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Instagram Profile URL
              </label>
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/jayaprakash_m"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={formData.socialLinks.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value },
                  })
                }
                placeholder="https://github.com/JayaprakashM-jpg"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Twitter / X Profile URL (Optional)
              </label>
              <input
                type="text"
                value={formData.socialLinks.twitter || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://x.com/jayaprakash_m"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                LeetCode Profile URL (Optional)
              </label>
              <input
                type="text"
                value={formData.socialLinks.leetcode || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, leetcode: e.target.value },
                  })
                }
                placeholder="https://leetcode.com/u/jayaprakash_m"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kaggle Profile URL (Optional)
              </label>
              <input
                type="text"
                value={formData.socialLinks.kaggle || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, kaggle: e.target.value },
                  })
                }
                placeholder="https://kaggle.com/jayaprakashm"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Identity & Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Professional Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            PDF Resume Asset File Path
          </label>
          <input
            type="text"
            value={formData.resumeUrl}
            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
            placeholder="/public/assets/aistudio/Jayaprakash_M_Resume_f37f051d.pdf"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Profile Bio Summary
          </label>
          <textarea
            rows={4}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 resize-none leading-relaxed"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          Save Profile & Social Links
        </button>
      </form>
    </div>
  );
};



/* --- TAB 8: SETTINGS & BACKUP --- */
const SettingsTab: React.FC<{
  adminPassword: string;
  changeAdminPassword: (p: string) => void;
  emailApiKey: string;
  updateEmailApiKey: (k: string) => void;
  exportDataJson: () => void;
  importDataJson: (json: string) => void;
  resetToDefault: () => void;
}> = ({
  adminPassword,
  changeAdminPassword,
  emailApiKey,
  updateEmailApiKey,
  exportDataJson,
  importDataJson,
  resetToDefault,
}) => {
  const [newPass, setNewPass] = useState('');
  const [passUpdated, setPassUpdated] = useState(false);

  const [apiKeyInput, setApiKeyInput] = useState(emailApiKey || 'web3forms-portfolio-key');
  const [apiKeyUpdated, setApiKeyUpdated] = useState(false);

  useEffect(() => {
    setApiKeyInput(emailApiKey || 'web3forms-portfolio-key');
  }, [emailApiKey]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass.trim()) return;
    changeAdminPassword(newPass.trim());
    setNewPass('');
    setPassUpdated(true);
    setTimeout(() => setPassUpdated(false), 3000);
  };

  const handleApiKeySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    updateEmailApiKey(apiKeyInput.trim());
    setApiKeyUpdated(true);
    setTimeout(() => setApiKeyUpdated(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) importDataJson(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold font-display text-navy dark:text-beige-light">
          Security & System Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-beige mt-1">
          Control administrative credentials, configure your email dispatch API key, and manage portable JSON backups.
        </p>
      </div>

      {/* Email API Dispatch Key Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-beige-light">
              Direct Email Dispatch API Key
            </h3>
            <p className="text-xs text-slate-500 dark:text-beige mt-0.5">
              Used in the contact section to automatically deliver recruiter inquiries directly to <strong>mprakash102006@gmail.com</strong>.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-olive/10 text-olive border border-olive/30 self-start sm:self-auto">
            Web3Forms Active
          </span>
        </div>

        <form onSubmit={handleApiKeySave} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <input
            type="text"
            required
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="e.g. web3forms-portfolio-key or your Web3Forms access key"
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-beige-border dark:border-navy-border bg-beige-light dark:bg-navy text-navy dark:text-beige-light font-mono focus:outline-hidden focus:border-terracotta"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Save API Key
          </button>
        </form>
        {apiKeyUpdated && (
          <p className="text-xs text-olive font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Email API key saved. Recruiter notes will route with this key.</span>
          </p>
        )}
      </div>

      {/* Admin Passcode Update */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-beige-light">
          Change Admin Passcode
        </h3>
        <p className="text-xs text-slate-500 dark:text-beige">
          Current passcode: <span className="font-mono font-bold text-terracotta">{adminPassword}</span> (or backup: <span className="font-mono text-terracotta">jayaprakash2026</span>)
        </p>

        <form onSubmit={handlePasswordChange} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="text"
            required
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Enter new administrator passcode"
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-beige-border dark:border-navy-border bg-beige-light dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Update
          </button>
        </form>
        {passUpdated && (
          <p className="text-xs text-olive font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passcode updated successfully.</span>
          </p>
        )}
      </div>

      {/* Backup and Restore */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-beige-light">
          Portable JSON Backup & Migration
        </h3>
        <p className="text-xs text-slate-500 dark:text-beige">
          Download your complete portfolio data as a JSON file, or restore from a previously exported backup file.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={exportDataJson}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-navy dark:bg-terracotta hover:bg-navy-surface rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Portfolio JSON</span>
          </button>

          <label className="px-4 py-2.5 text-xs font-semibold text-navy dark:text-beige-light bg-beige-light dark:bg-navy hover:bg-beige-surface rounded-xl border border-beige-border dark:border-navy-border transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs">
            <Upload className="w-4 h-4 text-olive" />
            <span>Restore Backup JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Danger Zone: Reset to Baseline */}
      <div className="p-6 rounded-2xl bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 space-y-3">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-sm font-bold">Reset Portfolio to Resume Baseline</h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This will wipe any custom modifications and re-populate the original resume data for Jayaprakash M.
        </p>
        <button
          onClick={resetToDefault}
          className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Default Resume State</span>
        </button>
      </div>
    </div>
  );
};

/* --- PROJECT EDITOR MODAL --- */
const ProjectEditorModal: React.FC<{
  initialProject?: Project;
  onClose: () => void;
  onSave: (project: any) => void;
}> = ({ initialProject, onClose, onSave }) => {
  const [title, setTitle] = useState(initialProject?.title || '');
  const [subtitle, setSubtitle] = useState(initialProject?.subtitle || '');
  const [category, setCategory] = useState<any>(initialProject?.category || 'Machine Learning');
  const [date, setDate] = useState(initialProject?.date || '2025 – 2026');
  const [description, setDescription] = useState(initialProject?.description || '');
  const [longDescription, setLongDescription] = useState(
    initialProject?.longDescription || initialProject?.description || ''
  );
  const [techStack, setTechStack] = useState(
    Array.isArray(initialProject?.techStack)
      ? initialProject.techStack.join(', ')
      : 'Python, Flask, scikit-learn'
  );
  const [githubUrl, setGithubUrl] = useState(initialProject?.githubUrl || 'https://github.com/JayaprakashM-jpg');
  const [hostingUrl, setHostingUrl] = useState(initialProject?.hostingUrl || initialProject?.liveDemoUrl || '');
  const [image, setImage] = useState(
    initialProject?.image ||
      '/images/project_shieldai_malware_1793356467348.jpg'
  );
  const [featured, setFeatured] = useState(initialProject?.featured ?? true);

  // Sync state whenever initialProject changes
  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title || '');
      setSubtitle(initialProject.subtitle || '');
      setCategory(initialProject.category || 'Machine Learning');
      setDate(initialProject.date || '2025 – 2026');
      setDescription(initialProject.description || '');
      setLongDescription(initialProject.longDescription || initialProject.description || '');
      setTechStack(Array.isArray(initialProject.techStack) ? initialProject.techStack.join(', ') : '');
      setGithubUrl(initialProject.githubUrl || '');
      setHostingUrl(initialProject.hostingUrl || initialProject.liveDemoUrl || '');
      setImage(initialProject.image || '');
      setFeatured(initialProject.featured ?? true);
    }
  }, [initialProject]);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...(initialProject || {}),
      id: initialProject ? initialProject.id : ('proj-' + Date.now().toString(36)),
      title: title.trim(),
      subtitle: subtitle.trim(),
      category,
      date: date.trim(),
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      techStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
      githubUrl: githubUrl.trim() || undefined,
      hostingUrl: hostingUrl.trim() || undefined,
      liveDemoUrl: hostingUrl.trim() || undefined,
      image,
      featured,
      highlights: initialProject?.highlights && initialProject.highlights.length > 0
        ? initialProject.highlights
        : [
            'Production grade implementation with clean architecture.',
            'Validated through academic benchmarks.',
          ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-beige-border dark:border-navy-border flex items-center justify-between bg-beige-light dark:bg-navy">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-navy dark:text-beige-light">
              {initialProject ? 'Edit Project & Hosting URL' : 'Add New Project'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-beige mt-0.5">
              Add details, live website hosting address, and source code links.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-navy dark:hover:text-beige-light cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ShieldAI"
                className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
              >
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Subtitle / Tagline</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. AI-Based Malware Detection & Threat Rating"
              className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Date / Period</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2025 – 2026"
                className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-navy dark:text-beige-light">GitHub Repo URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/JayaprakashM-jpg/..."
                className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light font-mono text-[11px] focus:outline-hidden focus:border-terracotta"
              />
            </div>
          </div>

          {/* Dedicated Live Website Hosting URL field */}
          <div className="p-3.5 rounded-xl bg-terracotta/5 border border-terracotta/20 space-y-1">
            <div className="flex items-center gap-1.5 text-terracotta font-bold text-xs">
              <Globe className="w-3.5 h-3.5" />
              <span>Live Website Hosting URL</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-beige">
              Enter the deployed live web application URL. This creates and links the <strong>"Live Website"</strong> button beside the Source Repository button.
            </p>
            <input
              type="text"
              value={hostingUrl}
              onChange={(e) => setHostingUrl(e.target.value)}
              placeholder="https://shieldai-malware-detect.vercel.app"
              className="w-full px-3 py-2 rounded-lg border border-terracotta/40 bg-white dark:bg-navy text-navy dark:text-beige-light font-mono text-[11px] focus:outline-hidden focus:ring-1 focus:ring-terracotta"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Technologies (comma-separated)</label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="Python, Flask, scikit-learn, Chart.js"
              className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta"
            />
          </div>

          {/* Project Image */}
          <div>
            <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Project Screenshot Image (URL or File Upload)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL or local path"
                className="flex-1 px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light font-mono text-[11px] focus:outline-hidden focus:border-terracotta"
              />
              <label className="px-3 py-2 rounded-xl bg-beige-light dark:bg-navy hover:bg-beige-surface dark:hover:bg-navy-surface border border-beige-border dark:border-navy-border cursor-pointer flex items-center gap-1 font-semibold text-navy dark:text-beige transition-colors">
                <Upload className="w-3.5 h-3.5 text-terracotta" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
              </label>
            </div>
            {image && (
              <div className="mt-2 w-32 h-18 rounded-lg border border-beige-border dark:border-navy-border overflow-hidden bg-navy">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Brief Description (for card)</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-navy dark:text-beige-light">Detailed Case Study Description (for modal)</label>
            <textarea
              rows={4}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light focus:outline-hidden focus:border-terracotta leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded accent-terracotta"
            />
            <label htmlFor="featuredCheck" className="font-semibold text-navy dark:text-beige-light cursor-pointer">
              Feature on Homepage
            </label>
          </div>

          <div className="pt-4 border-t border-beige-border dark:border-navy-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-beige hover:bg-beige-surface dark:hover:bg-navy transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-white bg-terracotta hover:bg-terracotta-dark font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- CERTIFICATE EDITOR MODAL (Supports Photo Upload) --- */
const CertificateEditorModal: React.FC<{
  initialCert?: Certificate;
  onClose: () => void;
  onSave: (cert: any) => void;
}> = ({ initialCert, onClose, onSave }) => {
  const [title, setTitle] = useState(initialCert?.title || '');
  const [issuer, setIssuer] = useState(initialCert?.issuer || '');
  const [issueDate, setIssueDate] = useState(initialCert?.issueDate || 'October 2024');
  const [credentialId, setCredentialId] = useState(initialCert?.credentialId || '');
  const [category, setCategory] = useState<any>(initialCert?.category || 'Professional');
  const [verificationUrl, setVerificationUrl] = useState(initialCert?.verificationUrl || '');
  const [photoUrl, setPhotoUrl] = useState(
    initialCert?.photoUrl ||
      '/images/cert_ibm_data_analytics_1793356465692.jpg'
  );
  const [description, setDescription] = useState(initialCert?.description || '');
  const [skills, setSkills] = useState(initialCert?.skills?.join(', ') || 'Python, Data Analytics, Visualization');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPhotoUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialCert || {}),
      title,
      issuer,
      issueDate,
      credentialId,
      category,
      verificationUrl,
      photoUrl,
      description,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-slate-100">
            {initialCert ? 'Edit Certificate' : 'Upload Certificate Photo'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="block font-semibold mb-1">Certificate / Award Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Certificate of Participation — Naan Mudhalvan Hackathon"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Issuing Organization *</label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. IBM SkillsBuild"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Professional">Professional</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Issue Date</label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="e.g. October 2024"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Credential ID (Optional)</label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. IBM-DA-84729103"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono"
              />
            </div>
          </div>

          {/* Certificate Photo Upload */}
          <div>
            <label className="block font-semibold mb-1">Certificate Photo (Upload file or paste URL) *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Photo URL or uploaded data"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono text-[11px]"
              />
              <label className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white cursor-pointer flex items-center gap-1 font-semibold shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
            {photoUrl && (
              <div className="mt-3 aspect-[4/3] max-w-[200px] rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-950 shadow-sm">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Verification / Official Issuer URL</label>
            <input
              type="text"
              value={verificationUrl}
              onChange={(e) => setVerificationUrl(e.target.value)}
              placeholder="https://skillsbuild.org/"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Skills Validated (comma-separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, Pandas, Exploratory Data Analysis, Data Cleaning"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description / Monograph</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 font-semibold"
            >
              Save Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- EXPERIENCE EDITOR MODAL --- */
const ExperienceEditorModal: React.FC<{
  initialExp?: Experience;
  onClose: () => void;
  onSave: (exp: any) => void;
}> = ({ initialExp, onClose, onSave }) => {
  const [role, setRole] = useState(initialExp?.role || '');
  const [company, setCompany] = useState(initialExp?.company || '');
  const [type, setType] = useState(initialExp?.type || 'Remote Internship');
  const [duration, setDuration] = useState(initialExp?.duration || '2025');
  const [location, setLocation] = useState(initialExp?.location || 'Remote, India');
  const [points, setPoints] = useState(initialExp?.points.join('\n') || '');
  const [technologies, setTechnologies] = useState(initialExp?.technologies.join(', ') || 'Python, SQL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialExp || {}),
      role,
      company,
      type,
      duration,
      location,
      points: points.split('\n').filter((p) => p.trim()),
      technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-slate-100">
            {initialExp ? 'Edit Milestone' : 'Add Experience / Degree'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Role / Degree Title *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Data Analyst Intern"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Company / Institution *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="IBM Adroit Technologies"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Remote Internship"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="2025"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote, India"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Key Responsibilities / Highlights (one per line)</label>
            <textarea
              rows={4}
              required
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Performed data cleaning and exploratory analysis&#10;Collaborated using industry standard tools"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Technologies Used (comma-separated)</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Python, Pandas, SQL"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 font-semibold"
            >
              Save Milestone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
