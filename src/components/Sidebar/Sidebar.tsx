import { motion } from 'framer-motion';
import { Home, User, Code, FolderGit2, Briefcase, Award, Mail, } from 'lucide-react';

import { useActiveSection } from '@/hooks/useActiveSection';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Code, label: 'Skills' },
  { id: 'projects', icon: FolderGit2, label: 'Projects' },
  { id: 'education', icon: Briefcase, label: 'Education' },
  { id: 'achievements', icon: Award, label: 'Achievements' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];



export default function Sidebar() {
  
  const activeSection = useActiveSection(navItems.map((i) => i.id));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed left-0 top-20 bottom-0 w-20 z-[90] hidden md:flex flex-col items-center py-6 glass border-r border-white/5"
      aria-label="Sidebar navigation"
    >
      <div className="flex flex-col gap-2 flex-1 ">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all group ${
                isActive ? 'bg-primary/20 text-white' : 'text-muted hover:text-white hover:bg-white/5'
              }`}
              aria-label={item.label}
            >
              <Icon size={20} />
              {isActive && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute left-0 w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                />
              )}
              <span className="absolute left-14 px-2 py-1 rounded-md glass text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      
      
        
      
    </motion.aside>
  );
}
