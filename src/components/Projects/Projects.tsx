import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FolderGit2, Search, ArrowRight, Star, X } from 'lucide-react';
import SectionHeading from '@/components/UI/SectionHeading';
import projectsData from '@/data/projects.json';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  github: string;
  demo: string;
  featured: boolean;
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      scrollYRef.current = scrollY;
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        window.scrollTo(0, scrollYRef.current);
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [selectedProject]);

  const handleWheel = (e: React.WheelEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      contentRef.current.scrollTop += e.deltaY;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      if (e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY.current - currentY;
        contentRef.current.scrollTop += deltaY;
        touchStartY.current = currentY;
      }
    }
  };

  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter((p) => {
      const matchesCategory = filter === 'All' || p.category === filter;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section id="projects" className="relative z-10 section-pad px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Projects" subtitle="Featured Work" icon={<FolderGit2 size={14} className="text-primary" />} />

        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {projectsData.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass text-muted hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl glass text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="glass-card overflow-hidden group relative"
              >
                {project.featured && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    <Star size={12} /> Featured
                  </div>
                )}

                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/50 to-transparent" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs font-mono">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md glass text-xs text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                   {/* <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted hover:text-white text-sm transition-colors"
                    >
                      <Github size={16} /> Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted hover:text-white text-sm transition-colors"
                    >
                      <ExternalLink size={16} /> Demo 
                    </a>*/}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="ml-auto flex items-center gap-1 text-primary text-sm font-medium group/btn"
                      aria-label={`View details for ${project.title}`}
                    >
                      Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p>No projects found. Try a different search.</p>
          </div>
        )}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-hidden"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <motion.div
                ref={modalRef}
                tabIndex={-1}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                className="outline-none relative w-[90vw] max-w-[1100px] h-[85vh] max-h-[calc(100vh-80px)] glass-card rounded-[24px] overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10 text-white flex flex-col lg:flex-row focus:outline-none"
              >
                {/* Close Button (44x44) */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full glass hover:bg-white/15 transition-all text-white/70 hover:text-white hover:scale-110 active:scale-95 shadow-md border border-white/10"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Left/Content Column (Scrolls internally) */}
                <div
  ref={contentRef}
  onWheel={(e) => e.stopPropagation()}
  className="overflow-y-auto overflow-x-hidden h-auto lg:h-full overscroll-contain flex-1 p-6 lg:p-8 order-2 lg:order-1 flex flex-col justify-between"
>
                  <div className="space-y-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-mono tracking-wider uppercase border border-primary/20">
                        {selectedProject.category}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-3 leading-tight">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Description</h4>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed font-sans">
                        {selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.features && selectedProject.features.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-white/70 text-sm leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-lg glass text-xs text-white/90 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 mt-8 border-t border-white/5">
                   {/* <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all hover:scale-[1.02]"
                    >
                      <Github size={18} /> View Code
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a> */}
                  </div>
                   
                </div>
                  
                {/* Right/Image Column (Fixed on desktop, ordered on top on mobile/tablet) */}
                <div className="w-full lg:w-[45%] h-48 sm:h-64 lg:h-full flex-shrink-0 relative overflow-hidden bg-white/5 border-b lg:border-b-0 lg:border-l border-white/5 order-1 lg:order-2">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
