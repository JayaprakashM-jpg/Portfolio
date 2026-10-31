import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code, Server, Cpu, Wrench, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();

  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.toLowerCase().includes('lang')) return <Code className="w-4 h-4 text-terracotta" />;
    if (categoryName.toLowerCase().includes('web')) return <Server className="w-4 h-4 text-olive" />;
    if (categoryName.toLowerCase().includes('data') || categoryName.toLowerCase().includes('machine'))
      return <Cpu className="w-4 h-4 text-terracotta" />;
    if (categoryName.toLowerCase().includes('tool')) return <Wrench className="w-4 h-4 text-olive" />;
    return <Layers className="w-4 h-4 text-terracotta" />;
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-beige-border dark:border-navy-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-terracotta uppercase mb-2">
            Technical Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy dark:text-beige-light font-display">
            Skills & Technical Stack
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-beige">
            Proficiencies across programming languages, AI modeling frameworks, web architecture, and database engineering.
          </p>
        </div>

        {/* 5-Column or Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skillCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-beige-border dark:border-navy-border">
                  {getCategoryIcon(category.categoryName)}
                  <h3 className="text-base font-bold font-display text-navy dark:text-beige-light">
                    {category.categoryName}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-navy dark:text-beige-light">{skill.name}</span>
                        <span className="text-[11px] font-mono text-olive">
                          {skill.proficiency}
                        </span>
                      </div>
                      {/* Visual indicator bar */}
                      <div className="h-1.5 w-full bg-beige-surface dark:bg-navy rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            skill.proficiency === 'Advanced'
                              ? 'w-full bg-terracotta'
                              : skill.proficiency === 'Proficient'
                              ? 'w-4/5 bg-olive'
                              : 'w-3/5 bg-beige'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 text-[11px] text-slate-400 dark:text-beige/60 flex items-center justify-between">
                <span>Domain verified</span>
                <span className="font-mono">{category.skills.length} competencies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
