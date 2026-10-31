import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Sun,
  Moon,
  Shield,
  Menu,
  X,
  ArrowUpRight,
  Lock,
  Linkedin,
  Instagram,
  Github,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, activeTheme, setThemeSetting, themeSetting, isAdminLoggedIn, setCurrentView } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (themeSetting === 'dark') setThemeSetting('light');
    else if (themeSetting === 'light') setThemeSetting('dark');
    else setThemeSetting(activeTheme === 'dark' ? 'light' : 'dark');
  };

  const { socialLinks } = data.profile;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark with Profile Photo */}
        <a
          href="#hero"
          className="group flex items-center gap-3 whitespace-nowrap shrink-0"
        >
          <div className="relative">
            <img
              src={data.profile.avatarUrl}
              alt={data.profile.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-terracotta/80 shadow-xs group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-olive border-2 border-white dark:border-navy rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-navy dark:text-beige-light group-hover:text-terracotta transition-colors">
              {data.profile.name}
            </span>
            <span className="text-[10px] text-olive font-mono -mt-0.5">
              Software / Data Analyst
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-beige">
          <a
            href="#projects"
            className="hover:text-terracotta transition-colors whitespace-nowrap shrink-0"
          >
            Projects
          </a>
          <a
            href="#certificates"
            className="hover:text-terracotta transition-colors whitespace-nowrap shrink-0"
          >
            Certificates
          </a>
          <a
            href="#experience"
            className="hover:text-terracotta transition-colors whitespace-nowrap shrink-0"
          >
            Experience
          </a>
          <a
            href="#skills"
            className="hover:text-terracotta transition-colors whitespace-nowrap shrink-0"
          >
            Skills
          </a>
          <a
            href="#resume"
            className="hover:text-terracotta transition-colors whitespace-nowrap shrink-0"
          >
            Resume
          </a>
        </nav>

        {/* Zone 3: Social quick links, Theme switcher, Admin entry, Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Social Links (LinkedIn & Instagram & GitHub) */}
          <div className="hidden sm:flex items-center gap-1 pr-1.5 border-r border-beige-border dark:border-navy-border">
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded-lg text-slate-500 hover:text-terracotta dark:text-beige dark:hover:text-terracotta hover:bg-beige-surface dark:hover:bg-navy transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="p-1.5 rounded-lg text-slate-500 hover:text-terracotta dark:text-beige dark:hover:text-terracotta hover:bg-beige-surface dark:hover:bg-navy transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded-lg text-slate-500 hover:text-olive dark:text-beige dark:hover:text-olive hover:bg-beige-surface dark:hover:bg-navy transition-colors"
                title="GitHub Repositories"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Theme switch button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta hover:bg-beige-surface dark:hover:bg-navy transition-colors cursor-pointer"
            title={`Switch to ${activeTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {activeTheme === 'dark' ? <Sun className="w-4 h-4 text-terracotta" /> : <Moon className="w-4 h-4 text-navy" />}
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-all shadow-xs hover:shadow-terracotta/20 whitespace-nowrap shrink-0 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Projects
          </a>
          <a
            href="#certificates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Certificates
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Experience
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Skills
          </a>
          <a
            href="#resume"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Resume
          </a>

          {/* Mobile Socials */}
          <div className="pt-2 flex items-center gap-3 px-3">
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
