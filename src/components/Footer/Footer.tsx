import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin,Instagram, Heart} from 'lucide-react';
import profile from '@/data/profile.json';

const quickLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 border-t border-white/5 px-4 md:px-8 pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2 mb-4 group" aria-label="Go to home">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
                <span className="text-white font-display font-bold text-sm">VD</span>
              </div>
              <span className="font-display font-semibold text-white">{profile.name}</span>
            </button>
            <p className="text-muted text-sm max-w-xs">{profile.tagline}</p>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-muted hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { Icon: Github, url: profile.social[0].url, label: 'GitHub' },
                { Icon: Linkedin, url: profile.social[1].url, label: 'LinkedIn'},
                { Icon: Instagram, url: profile.social[2].url, label: 'Instagram' },
              
              ].map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted hover:text-white hover:scale-110 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-muted text-xs flex items-center gap-1.5">
            Made with <Heart size={12} className="text-primary fill-primary" /> by {profile.name} • {new Date().getFullYear()}
          </p>

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -3 }}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
