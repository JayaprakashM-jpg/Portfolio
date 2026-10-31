import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, Download, Eye, CheckCircle2, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { data, setIsResumeModalOpen } = usePortfolio();
  const resumePath = data.profile.resumeUrl.replace(/^\/public/, '');

  return (
    <section id="resume" className="py-20 md:py-28 border-t border-beige-border dark:border-navy-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy via-[#122040] to-navy text-beige-light rounded-3xl p-8 sm:p-12 border border-navy-border relative overflow-hidden shadow-2xl">
          {/* Subtle gradient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-olive/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae</span>
                <span aria-hidden="true">·</span>
                <span>Verified Candidate Dossier</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Download Official Resume
              </h2>

              <p className="mt-3 text-beige/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                Looking for an entry-level Software Engineer or Data Analyst? Access the comprehensive single-page resume detailing technical competencies, research capstones, and IBM internship achievements.
              </p>

              {/* Bullet highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-beige-light">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>Naan Mudhalvan State Hackathon Participant (IBM Track)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>ShieldAI Capstone: 48-page academic research</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>IBM Adroit Technologies Remote Internship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>B.E. CSE Anna University (Graduating 2027)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <a
                href={resumePath}
                download="Jayaprakash_M_Resume.pdf"
                className="w-full py-3 px-5 text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download PDF Resume</span>
              </a>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="w-full py-3 px-5 text-sm font-semibold text-beige-light bg-navy-surface hover:bg-navy border border-navy-border rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-terracotta" />
                <span>Preview Document in Browser</span>
              </button>

              <a
                href={`mailto:${data.profile.email}?subject=Job Opportunity - Software / Data Analyst Role`}
                className="w-full py-3 px-5 text-xs font-medium text-beige hover:text-white transition-colors text-center inline-flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <span>Contact directly for interview scheduling</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
