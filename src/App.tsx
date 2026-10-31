/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { CertificatesSection } from './components/CertificatesSection';
import { CertificateModal } from './components/CertificateModal';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ResumeSection } from './components/ResumeSection';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { currentView } = usePortfolio();

  if (currentView === 'admin-login') {
    return <AdminLogin />;
  }

  if (currentView === 'admin-dashboard') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* 3-Zone Navigation Header */}
      <Navbar />

      {/* Main Page Sections */}
      <main>
        <Hero />
        <ProjectsSection />
        <CertificatesSection />
        <ExperienceSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <ProjectModal />
      <CertificateModal />
      <ResumeViewerModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
}
