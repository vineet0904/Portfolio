import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import MagneticButton from '@/components/UI/MagneticButton';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 backdrop-blur-2xl ${
  scrolled
    ? "glass border-b border-white/10 shadow-xl"
    : "bg-[#090B16]/70 border-b border-white/5"
}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
            <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => scrollTo("home")}
  className="flex items-center justify-center w-12 h-12 rounded-2xl glass-card bg-gradient-to-br from-primary to-secondary font-bold text-white shadow-lg"
>
  VD
</motion.button>
            

          <div className="hidden lg:flex flex-1 justify-center items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-6 py-2 text-[15px] font-bold tracking-wide transition-colors ${
                    activeSection === link.id ? 'text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4">
              <MagneticButton
                onClick={() => scrollTo("contact")}
                className="hidden lg:inline-flex"
              >
                Let's Connect
              </MagneticButton>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-muted hover:text-white transition-colors"
                aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-[99] glass border-t border-white/5 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col p-4 gap-2 bg-[#090B16]/95 backdrop-blur-2xl">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-primary/20 text-white'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
