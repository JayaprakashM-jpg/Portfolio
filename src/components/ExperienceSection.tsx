import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-beige-border dark:border-navy-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-terracotta uppercase mb-2">
            Career & Academic Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy dark:text-beige-light font-display">
            Experience & Education
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-beige">
            Professional internship history and university engineering foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Work Experience Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 mb-6 text-sm font-bold text-navy dark:text-beige-light uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-terracotta" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-6">
              {data.experiences
                .filter((e) => e.type.toLowerCase().includes('intern') || e.type.toLowerCase().includes('work'))
                .map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <h3 className="text-xl font-bold font-display text-navy dark:text-beige-light">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-olive">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-beige mb-4 font-medium">
                      <span className="text-terracotta font-semibold">{exp.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.type}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-olive" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-beige/90">
                      {exp.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0 mt-1" />
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-beige-border dark:border-navy-border flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-beige/70">
                        <span className="font-semibold text-navy dark:text-beige-light">Key Tools:</span>
                        {exp.technologies.map((t, idx) => (
                          <React.Fragment key={t}>
                            <span>{t}</span>
                            {idx < exp.technologies.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Education & Academic Rigor Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5 mb-6 text-sm font-bold text-navy dark:text-beige-light uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-olive" />
              <span>Undergraduate Education</span>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs space-y-4">
              <div>
                <span className="text-xs font-mono text-terracotta font-semibold block mb-1">
                  {data.profile.education.expectedGraduation}
                </span>
                <h3 className="text-lg font-bold font-display text-navy dark:text-beige-light">
                  {data.profile.education.degree}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-beige mt-1">
                  {data.profile.education.institution}
                </p>
                <div className="mt-2 text-xs font-mono text-slate-500 dark:text-beige/70">
                  {data.profile.education.curriculum}
                </div>
              </div>

              <div className="pt-4 border-t border-beige-border dark:border-navy-border space-y-2 text-xs text-slate-600 dark:text-beige/90">
                <p className="leading-relaxed">
                  Rigorous engineering curriculum focusing on computational theory, algorithmic complexity, database architectures, and distributed systems.
                </p>
                <div className="pt-2 font-medium text-navy dark:text-beige-light">
                  Core Modules:
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {['Data Structures & Algorithms', 'DBMS', 'OOP with Java/Python', 'Operating Systems', 'Web Tech'].map(
                    (course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 rounded-md bg-beige-light dark:bg-navy text-navy dark:text-beige border border-beige-border dark:border-navy-border"
                      >
                        {course}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Hackathon spotlight badge */}
              <div className="mt-4 p-3.5 rounded-xl bg-olive/10 border border-olive/25 text-xs text-navy dark:text-beige-light">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-olive">
                  <span>Naan Mudhalvan Hackathon Participant</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  Participated in the Naan Mudhalvan State Hackathon (IBM Track), collaborating on front-end web prototypes and responsive interface solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
