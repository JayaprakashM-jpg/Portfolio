import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { selectedCertificate, setSelectedCertificate } = usePortfolio();

  if (!selectedCertificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-navy/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setSelectedCertificate(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-beige-border dark:border-navy-border flex items-start justify-between gap-4 shrink-0 bg-beige-light/50 dark:bg-navy/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider mb-1">
              <span>{selectedCertificate.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedCertificate.issueDate}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-navy dark:text-beige-light">
              {selectedCertificate.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-beige mt-0.5">
              Issued by {selectedCertificate.issuer}
            </p>
          </div>

          <button
            onClick={() => setSelectedCertificate(null)}
            className="p-2 rounded-lg text-slate-400 hover:text-navy dark:hover:text-beige hover:bg-beige-surface dark:hover:bg-navy transition-colors cursor-pointer"
            aria-label="Close certificate lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Certificate Photo Lightbox Display */}
          <div className="relative rounded-xl overflow-hidden border border-beige-border dark:border-navy-border bg-navy flex items-center justify-center p-2 sm:p-4">
            <img
              src={selectedCertificate.photoUrl}
              alt={selectedCertificate.title}
              referrerPolicy="no-referrer"
              className="max-h-[500px] w-auto object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Description & Verification */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-olive mb-2">
                Credential Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-beige leading-relaxed">
                {selectedCertificate.description}
              </p>
            </div>

            {/* Credential ID and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border">
                <span className="text-xs text-slate-500 dark:text-beige/70 block mb-1">Credential ID:</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-navy dark:text-beige-light">
                  {selectedCertificate.credentialId || 'Verified Record'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-beige/70 block mb-1">Verification Status:</span>
                  <span className="text-xs sm:text-sm font-semibold text-olive flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-olive" />
                    <span>Authenticated & Active</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Validated Competencies */}
            {selectedCertificate.skills && selectedCertificate.skills.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-olive mb-2.5">
                  Validated Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-beige-light dark:bg-navy text-navy dark:text-beige border border-beige-border dark:border-navy-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-beige-border dark:border-navy-border bg-beige-light/50 dark:bg-navy/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-beige/80">
            Issued: {selectedCertificate.issueDate}
          </div>

          <div className="flex items-center gap-3">
            {selectedCertificate.verificationUrl && (
              <a
                href={selectedCertificate.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-navy dark:text-beige bg-white dark:bg-navy-surface hover:bg-beige-surface dark:hover:bg-navy border border-beige-border dark:border-navy-border rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>Verify Issuer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => setSelectedCertificate(null)}
              className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
