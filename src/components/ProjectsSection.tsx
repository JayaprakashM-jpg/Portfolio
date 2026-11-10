import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Search, ArrowRight, Github, ExternalLink, Sparkles, Globe, ArrowUpRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Cybersecurity', 'Machine Learning', 'Web Development', 'Data Analytics'];

  const filteredProjects = useMemo(() => {
    return data.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [data.projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-beige-border dark:border-navy-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-terracotta uppercase mb-2">
              Engineering Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy dark:text-beige-light font-display">
              Featured Projects & Systems
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-beige max-w-2xl">
              End-to-end applications spanning applied machine learning, cybersecurity analytics, and responsive web platforms.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-olive" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-terracotta transition-shadow"
            />
          </div>
        </div>

        {/* Category Tabs Styled with Terracotta / Olive / Beige */}
        <div className="flex items-center gap-1.5 p-1 bg-beige-light dark:bg-navy rounded-2xl mb-10 overflow-x-auto border border-beige-border dark:border-navy-border w-fit max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-terracotta text-white font-semibold shadow-xs'
                  : 'text-navy dark:text-beige hover:text-terracotta dark:hover:text-terracotta'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid: Dynamic Bento Box */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-navy-surface rounded-3xl border border-beige-border dark:border-navy-border p-8">
            <p className="text-sm text-slate-500 dark:text-beige">No projects found matching the filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-terracotta hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => {
              const isLarge = index === 0 && selectedCategory === 'All';
              const projectLiveUrl = project.hostingUrl || project.liveDemoUrl;

              return (
                <div
                  key={project.id}
                  className={`group bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border rounded-3xl overflow-hidden hover:border-terracotta/80 hover:shadow-2xl hover:shadow-terracotta/10 transition-all duration-300 flex flex-col justify-between ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div>
                    {/* Media container */}
                    <div
                      className={`relative overflow-hidden bg-navy cursor-pointer ${
                        isLarge ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const filename = project.image.split('/').pop();
                          if (filename && !target.src.includes(`/images/${filename}`)) {
                            target.src = `/images/${filename}`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-navy/90 text-beige-light text-[11px] font-mono backdrop-blur-md border border-navy-border shadow-xs">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2.5 py-1 rounded-full bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-200" />
                            <span>Flagship</span>
                          </span>
                        )}
                      </div>

                      {/* Date kicker */}
                      <div className="absolute bottom-3.5 left-4 text-xs font-mono text-beige drop-shadow-xs">
                        {project.date}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center gap-2 text-xs font-medium text-olive mb-1.5">
                        <span className="font-semibold">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500 dark:text-beige/80">{project.techStack.slice(0, 3).join(', ')}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-xl sm:text-2xl font-bold font-display text-navy dark:text-beige-light group-hover:text-terracotta transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs font-medium text-slate-500 dark:text-beige mt-1">
                        {project.subtitle}
                      </p>

                      <p className="mt-3.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack inline typography with separators */}
                      <div className="mt-5 pt-4 border-t border-beige-border/60 dark:border-navy-border flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-500 dark:text-beige/80">
                        {project.techStack.map((tech, i) => (
                          <React.Fragment key={tech}>
                            <span className="font-mono text-[11px]">{tech}</span>
                            {i < project.techStack.length - 1 && (
                              <span aria-hidden="true" className="text-beige dark:text-navy-border">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card bottom bar: Details, Live Website & Source Repo */}
                  <div className="px-6 py-4 border-t border-beige-border/80 dark:border-navy-border bg-beige-light/60 dark:bg-navy/80 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-terracotta hover:text-terracotta-dark inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Details & Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Live Website Button */}
                      {projectLiveUrl && (
                        <a
                          href={projectLiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-2xs"
                          title="Visit Live Deployed Website"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live Website</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}

                      {/* Source Repository */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 dark:text-beige hover:text-navy dark:hover:text-white hover:bg-beige-surface dark:hover:bg-navy transition-colors"
                        title="Source Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
