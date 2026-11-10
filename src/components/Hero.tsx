import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  FileText,
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  Instagram,
  Sparkles,
  Code2,
  Cpu,
  Database,
  Terminal as TerminalIcon,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, setIsResumeModalOpen, setSelectedProject } = usePortfolio();
  const { profile } = data;
  const { socialLinks } = profile;

  const shieldAiProject = data.projects.find((p) => p.id === 'shieldai') || data.projects[0];

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Dynamic ambient background radial glows in palette tones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-terracotta/15 via-olive/10 to-beige/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Tag */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 border border-terracotta/30 text-xs font-semibold text-terracotta dark:text-terracotta-light shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span>Available for 2026/2027 Engineering & Data Roles</span>
            <span aria-hidden="true" className="opacity-40">|</span>
            <span className="text-[11px] font-mono opacity-80">Anna University CSE</span>
          </div>
        </div>

        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Personal Intro + Bio + CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy dark:text-beige-light font-display leading-[1.08]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-[#b5583d] to-olive">{profile.name}</span>
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-bold text-olive dark:text-beige">
                {profile.tagline}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-beige-light leading-relaxed font-normal max-w-2xl">
              {profile.summary}
            </p>

            {/* Quick Skills highlights strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 dark:text-beige/70 font-medium mr-1">Core Arsenal:</span>
              {['Python', 'Flask', 'Machine Learning', 'SQL / DBMS', 'Chart.js', 'DevOps'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-navy-surface text-navy dark:text-beige border border-beige-border dark:border-navy-border font-mono text-[11px] shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-all shadow-md shadow-terracotta/25 hover:shadow-terracotta/40 inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-5 py-3 text-sm font-semibold text-navy dark:text-beige-light bg-white dark:bg-navy-surface hover:bg-beige-surface dark:hover:bg-navy border border-beige-border dark:border-navy-border rounded-xl transition-all inline-flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-olive" />
                <span>Resume PDF</span>
              </button>

              <a
                href="#contact"
                className="px-5 py-3 text-sm font-semibold text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-terracotta" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Verified Location & Contact Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-beige/80 font-mono">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>{profile.location}</span>
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-terracotta transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <span>{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-olive transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-olive" />
                <span>{profile.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Profile Portrait & Social Matrix Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-white/90 dark:bg-navy-surface/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-beige-border dark:border-navy-border shadow-xl relative overflow-hidden group">
              {/* Background ambient color tint */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-terracotta/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-olive/15 rounded-full blur-2xl pointer-events-none" />

              {/* Portrait Photo with Circular Aura */}
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 mb-5">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-terracotta via-olive to-beige p-1 shadow-lg group-hover:scale-102 transition-transform duration-500">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full bg-navy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/images/profile_jayaprakash_portrait_1793369527676.jpg')) {
                        target.src = '/images/profile_jayaprakash_portrait_1793369527676.jpg';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Identity & Education */}
              <div className="text-center">
                <h2 className="text-xl font-bold font-display text-navy dark:text-beige-light">
                  {profile.name}
                </h2>
                <p className="text-xs font-semibold text-terracotta mt-0.5">
                  {profile.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-beige mt-1">
                  Anna University (UCE, Nagercoil) · Class of 2027
                </p>
              </div>

              {/* Dedicated Social Media Links Strip (Instagram, LinkedIn, GitHub, LeetCode, Email) */}
              <div className="mt-5 pt-4 border-t border-beige-border dark:border-navy-border">
                <div className="text-[11px] font-semibold text-slate-400 dark:text-beige/70 text-center uppercase tracking-wider mb-2.5">
                  Connect Across Platforms
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta hover:border-terracotta transition-all flex flex-col items-center gap-1 group/btn shadow-2xs"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5 text-terracotta group-hover/btn:scale-110 transition-transform" />
                      <span className="text-[10px] font-medium">LinkedIn</span>
                    </a>
                  )}

                  {socialLinks?.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta hover:border-terracotta transition-all flex flex-col items-center gap-1 group/btn shadow-2xs"
                      title="Instagram Profile"
                    >
                      <Instagram className="w-5 h-5 text-terracotta group-hover/btn:scale-110 transition-transform" />
                      <span className="text-[10px] font-medium">Instagram</span>
                    </a>
                  )}

                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta hover:border-terracotta transition-all flex flex-col items-center gap-1 group/btn shadow-2xs"
                      title="GitHub Profile"
                    >
                      <Github className="w-5 h-5 group-hover/btn:scale-110 transition-transform text-olive" />
                      <span className="text-[10px] font-medium">GitHub</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border text-navy dark:text-beige hover:text-olive dark:hover:text-olive hover:border-olive transition-all flex flex-col items-center gap-1 group/btn shadow-2xs"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5 text-olive group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] font-medium">Email</span>
                  </a>
                </div>
              </div>

              {/* Capstone Quick Peek Button */}
              <div className="mt-4 pt-3 border-t border-beige-border dark:border-navy-border flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-beige">Featured AI Capstone:</span>
                <button
                  onClick={() => setSelectedProject(shieldAiProject)}
                  className="font-semibold text-terracotta hover:text-terracotta-dark dark:hover:text-terracotta-light hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>ShieldAI Scanner</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative KPI Strip */}
        <div className="mt-14 pt-8 border-t border-beige-border dark:border-navy-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs hover:border-terracotta transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-terracotta font-mono tabular-nums">
                98.2%
              </div>
              <div className="text-xs text-navy dark:text-beige-light font-semibold mt-1">
                Peak F1 Detection Score
              </div>
              <div className="text-[11px] text-slate-500 dark:text-beige mt-0.5">
                ShieldAI ML Tournament Engine
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs hover:border-olive transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-olive font-mono tabular-nums">
                Participant
              </div>
              <div className="text-xs text-navy dark:text-beige-light font-semibold mt-1">
                Naan Mudhalvan Hackathon
              </div>
              <div className="text-[11px] text-slate-500 dark:text-beige mt-0.5">
                IBM Front-End Track
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs hover:border-terracotta transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-terracotta font-mono tabular-nums">
                IBM Adroit
              </div>
              <div className="text-xs text-navy dark:text-beige-light font-semibold mt-1">
                Data Analyst Internship
              </div>
              <div className="text-[11px] text-slate-500 dark:text-beige mt-0.5">
                EDA, Analytics & Visualizations
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs hover:border-olive transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-olive font-mono tabular-nums">
                2027 CSE
              </div>
              <div className="text-xs text-navy dark:text-beige-light font-semibold mt-1">
                B.E. Anna University
              </div>
              <div className="text-[11px] text-slate-500 dark:text-beige mt-0.5">
                Regulation 2021 Curriculum
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
