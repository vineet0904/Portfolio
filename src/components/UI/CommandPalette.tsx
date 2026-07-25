import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Home, User, Code, FolderGit2, Briefcase, Award, Mail, X } from 'lucide-react';

const commands = [
  { id: 'home', label: 'Go to Home', icon: Home },
  { id: 'about', label: 'Go to About', icon: User },
  { id: 'skills', label: 'Go to Skills', icon: Code },
  { id: 'projects', label: 'Go to Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Go to Experience', icon: Briefcase },
  { id: 'achievements', label: 'Go to Achievements', icon: Award },
  { id: 'contact', label: 'Go to Contact', icon: Mail },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const run = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg mx-4"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="glass-card overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <Search size={18} className="text-muted" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  aria-label="Search commands"
                  className="flex-1 bg-transparent text-white placeholder:text-muted focus:outline-none text-sm"
                />
                <button onClick={() => setOpen(false)} className="text-muted hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto p-2">
                {filtered.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => run(cmd.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Icon size={16} />
                      {cmd.label}
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="text-center text-muted text-sm py-4">No results found</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
