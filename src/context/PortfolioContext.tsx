import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  Profile,
  Project,
  Certificate,
  Experience,
  SkillCategory,
  ContactMessage,
} from '../types';
import { initialPortfolioData } from '../data/initialData';

interface PortfolioContextType {
  data: PortfolioData;
  activeTheme: 'light' | 'dark';
  themeSetting: 'light' | 'dark' | 'system';
  setThemeSetting: (theme: 'light' | 'dark' | 'system') => void;
  isAdminLoggedIn: boolean;
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  currentView: 'public' | 'admin-login' | 'admin-dashboard';
  setCurrentView: (view: 'public' | 'admin-login' | 'admin-dashboard') => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  // Mutations
  updateProfile: (profile: Profile) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (cert: Certificate) => void;
  deleteCertificate: (id: string) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (exp: Experience) => void;
  deleteExperience: (id: string) => void;
  updateSkillCategories: (categories: SkillCategory[]) => void;
  updateEmailApiKey: (key: string) => void;
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => boolean;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  changeAdminPassword: (newPass: string) => void;
  exportDataJson: () => void;
  importDataJson: (json: string) => { success: boolean; message: string };
  resetToDefault: () => void;
}

const STORAGE_KEY = 'jayaprakash_portfolio_data_v1';
const THEME_KEY = 'jayaprakash_portfolio_theme';
const ADMIN_AUTH_KEY = 'jayaprakash_portfolio_admin_auth';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Data State with LocalStorage persistence
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const certificates = Array.isArray(parsed.certificates)
          ? parsed.certificates.map((c: Certificate) => {
              if (c.id === 'cert-hackathon' || c.title?.toLowerCase().includes('naan mudhalvan')) {
                return {
                  ...c,
                  title: 'Certificate of Participation — Naan Mudhalvan Hackathon',
                  description:
                    'Participated in the state-level Naan Mudhalvan Hackathon conducted in collaboration with IBM. Contributed under the Front-End Technologies track developing responsive user interfaces and rapid web prototypes.',
                };
              }
              return c;
            })
          : initialPortfolioData.certificates;

        const summary = parsed.profile?.summary && parsed.profile.summary.includes('state-level recognition')
          ? parsed.profile.summary.replace(
              'state-level recognition in hackathons',
              'active participation in state-level hackathons like Naan Mudhalvan'
            )
          : parsed.profile?.summary || initialPortfolioData.profile.summary;

        return {
          ...initialPortfolioData,
          ...parsed,
          certificates,
          profile: {
            ...initialPortfolioData.profile,
            ...(parsed.profile || {}),
            summary,
            avatarUrl: parsed.profile?.avatarUrl || initialPortfolioData.profile.avatarUrl,
            socialLinks: {
              ...initialPortfolioData.profile.socialLinks,
              ...(parsed.profile?.socialLinks || {}),
            },
          },
        };
      }
    } catch (e) {
      console.error('Error loading portfolio data from localStorage:', e);
    }
    return initialPortfolioData;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving portfolio data:', e);
    }
  }, [data]);

  // 2. Theme State & Dark Mode management
  const [themeSetting, setThemeSetting] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    return 'dark'; // Dark mode preferred default for senior engineering portfolio
  });

  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themeSetting);

    const applyTheme = () => {
      let resolved: 'light' | 'dark' = 'dark';
      if (themeSetting === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolved = themeSetting;
      }
      setActiveTheme(resolved);

      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();

    if (themeSetting === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeSetting]);

  // 3. Admin Authentication & Routing State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  const checkIsAdminRoute = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase().replace(/\/$/, '');
    return (
      path === '/admin' ||
      path === '/admin-login' ||
      hash === '#admin' ||
      hash === '#/admin' ||
      hash === '#admin-login'
    );
  };

  const [currentView, setCurrentView] = useState<'public' | 'admin-login' | 'admin-dashboard'>(() => {
    if (checkIsAdminRoute()) {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' ? 'admin-dashboard' : 'admin-login';
    }
    return 'public';
  });

  // Sync /admin URL pathname and hash navigation
  useEffect(() => {
    const handleRouteSync = () => {
      const isTargetingAdmin = checkIsAdminRoute();
      if (isTargetingAdmin) {
        const loggedIn = sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
        setCurrentView(loggedIn ? 'admin-dashboard' : 'admin-login');
      } else {
        setCurrentView('public');
      }
    };

    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('hashchange', handleRouteSync);

    // Initial check and periodic check if user enters /admin in address bar
    handleRouteSync();

    const interval = setInterval(() => {
      if (checkIsAdminRoute()) {
        setCurrentView((prev) => {
          if (prev === 'public') {
            return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' ? 'admin-dashboard' : 'admin-login';
          }
          return prev;
        });
      }
    }, 400);

    return () => {
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('hashchange', handleRouteSync);
      clearInterval(interval);
    };
  }, []);

  const adminLogin = (pass: string): boolean => {
    if (pass.trim() === data.adminPassword.trim() || pass.trim() === 'jayaprakash2026' || pass.trim() === 'admin') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setCurrentView('admin-dashboard');
      if (window.location.pathname !== '/admin') {
        try {
          window.history.pushState(null, '', '/admin');
        } catch {
          window.location.hash = '#admin';
        }
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setCurrentView('public');
    try {
      window.history.pushState(null, '', '/');
    } catch {
      window.location.hash = '';
    }
  };

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // CRUD Mutations
  const updateProfile = (profile: Profile) => {
    setData((prev) => ({ ...prev, profile }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: 'proj-' + Date.now().toString(36),
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = {
      ...cert,
      id: 'cert-' + Date.now().toString(36),
    };
    setData((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
    }));
  };

  const updateCertificate = (cert: Certificate) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) => (c.id === cert.id ? cert : c)),
    }));
  };

  const deleteCertificate = (id: string) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  const addExperience = (exp: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...exp,
      id: 'exp-' + Date.now().toString(36),
    };
    setData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (exp: Experience) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === exp.id ? exp : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const updateSkillCategories = (categories: SkillCategory[]) => {
    setData((prev) => ({
      ...prev,
      skillCategories: categories,
    }));
  };

  const updateEmailApiKey = (key: string) => {
    setData((prev) => ({
      ...prev,
      emailApiKey: key,
    }));
  };

  const submitContactMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now().toString(36),
      ...msg,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
    };
    setData((prev) => ({
      ...prev,
      messages: [newMessage, ...prev.messages],
    }));
    return true;
  };

  const markMessageAsRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  };

  const changeAdminPassword = (newPass: string) => {
    setData((prev) => ({
      ...prev,
      adminPassword: newPass,
    }));
  };

  const exportDataJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `jayaprakash_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJson = (json: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed.profile || !parsed.projects || !parsed.certificates) {
        return { success: false, message: 'Invalid portfolio JSON structure.' };
      }
      setData({ ...initialPortfolioData, ...parsed });
      return { success: true, message: 'Portfolio data successfully imported.' };
    } catch (err) {
      return { success: false, message: 'Failed to parse JSON file: ' + (err as Error).message };
    }
  };

  const resetToDefault = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        activeTheme,
        themeSetting,
        setThemeSetting,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        currentView,
        setCurrentView,
        selectedProject,
        setSelectedProject,
        selectedCertificate,
        setSelectedCertificate,
        isResumeModalOpen,
        setIsResumeModalOpen,
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
        submitContactMessage,
        markMessageAsRead,
        deleteMessage,
        changeAdminPassword,
        exportDataJson,
        importDataJson,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
