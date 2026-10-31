import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export const ResumeViewerModal: React.FC = () => {
  const { isResumeModalOpen, setIsResumeModalOpen, data } = usePortfolio();
  const resumePath = data.profile.resumeUrl.replace(/^\/public/, '');

  if (!isResumeModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setIsResumeModalOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-slate-100">
                {data.profile.name} — Curriculum Vitae
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Resume Document (PDF) · Last updated 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumePath}
              download="Jayaprakash_M_Resume.pdf"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={resumePath}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Frame */}
        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 relative">
          <iframe
            src={resumePath}
            title={`${data.profile.name} Resume`}
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};
