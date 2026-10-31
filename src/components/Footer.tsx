import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, Linkedin, Instagram, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, isAdminLoggedIn, setCurrentView } = usePortfolio();
  const { socialLinks } = data.profile;

  return (
    <footer className="py-12 border-t border-beige-border dark:border-navy-border bg-beige-light dark:bg-navy-surface text-slate-500 dark:text-beige text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={data.profile.avatarUrl}
              alt={data.profile.name}
              className="w-8 h-8 rounded-full object-cover border border-terracotta/40"
            />
            <div>
              <span className="font-semibold text-navy dark:text-beige-light">
                {data.profile.name}
              </span>
              <span className="mx-2">·</span>
              <span className="text-olive">B.E. Computer Science and Engineering</span>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-2">
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg hover:bg-beige-surface dark:hover:bg-navy text-slate-500 hover:text-terracotta dark:text-beige dark:hover:text-terracotta transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg hover:bg-beige-surface dark:hover:bg-navy text-slate-500 hover:text-terracotta dark:text-beige dark:hover:text-terracotta transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg hover:bg-beige-surface dark:hover:bg-navy text-slate-500 hover:text-olive dark:text-beige dark:hover:text-olive transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${data.profile.email}`}
              className="p-2 rounded-lg hover:bg-beige-surface dark:hover:bg-navy text-slate-500 hover:text-terracotta dark:text-beige dark:hover:text-terracotta transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-beige-border dark:border-navy-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            <span>Regulation 2021 Anna University · All rights reserved © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-terracotta transition-colors">
              Back to Top
            </a>
            <a href="#projects" className="hover:text-terracotta transition-colors">
              Projects
            </a>
            <a href="#certificates" className="hover:text-terracotta transition-colors">
              Certifications
            </a>
            <a href="#contact" className="hover:text-terracotta transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
