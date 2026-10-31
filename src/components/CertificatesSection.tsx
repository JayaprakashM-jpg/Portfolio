import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, ShieldCheck, ZoomIn, CheckCircle2 } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const { data, setSelectedCertificate } = usePortfolio();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Hackathon', 'Professional', 'Cloud & DevOps'];

  const filteredCerts = data.certificates.filter((cert) => {
    if (filter === 'All') return true;
    return cert.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section id="certificates" className="py-20 md:py-28 border-t border-beige-border dark:border-navy-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-terracotta uppercase mb-2">
              Recognitions & Accreditations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy dark:text-beige-light font-display">
              Verifiable Certifications & Awards
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-beige max-w-2xl">
              Official industry certifications, hackathon recognitions, and professional development credentials.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-beige-light dark:bg-navy rounded-xl border border-beige-border dark:border-navy-border w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === cat
                    ? 'bg-terracotta text-white shadow-xs'
                    : 'text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border rounded-3xl overflow-hidden hover:border-terracotta hover:shadow-2xl hover:shadow-terracotta/10 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Photo Frame with Lightbox Zoom Trigger */}
                <div
                  className="relative aspect-[4/3] bg-navy overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  <img
                    src={cert.photoUrl}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-4 py-2 rounded-xl bg-white/95 dark:bg-navy-surface/95 text-navy dark:text-beige-light text-xs font-semibold backdrop-blur-md flex items-center gap-2 shadow-xl">
                      <ZoomIn className="w-4 h-4 text-terracotta" />
                      <span>Inspect High-Res Photo</span>
                    </span>
                  </div>

                  {/* Top category marker */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-navy/90 text-beige-light text-[11px] font-mono backdrop-blur-md border border-navy-border shadow-xs">
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-beige/80 mb-2">
                    <span className="font-semibold text-olive">{cert.issuer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cert.issueDate}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedCertificate(cert)}
                    className="text-lg font-bold font-display text-navy dark:text-beige-light group-hover:text-terracotta transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-600 dark:text-beige/90 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-beige-border dark:border-navy-border flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-[11px] rounded-lg bg-beige-light dark:bg-navy text-navy dark:text-beige font-medium font-mono border border-beige-border dark:border-navy-border"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-[11px] text-olive py-1 font-medium font-mono">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-beige-border dark:border-navy-border bg-beige-light/50 dark:bg-navy/50 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="font-semibold text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4 text-terracotta" />
                  <span>Inspect Credential</span>
                </button>

                {cert.credentialId && (
                  <span className="font-mono text-[11px] text-slate-400 dark:text-beige/60 truncate max-w-[140px]">
                    {cert.credentialId}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
