import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Clock, Download, Cpu, Zap } from 'lucide-react';
import SectionHeading from '@/components/UI/SectionHeading';
import MagneticButton from '@/components/UI/MagneticButton';
import aboutData from '@/data/about.json';

export default function About() {
  return (
    <section id="about" className="relative z-10 section-pad px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" subtitle="Who I Am" icon={<Cpu size={14} className="text-primary" />} />

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card p-6 md:p-8"
          >
            <h3 className="text-2xl font-display font-semibold mb-4 text-white">Profile Overview</h3>
            <p className="text-muted leading-relaxed mb-6">{aboutData.summary}</p>

            <div className="space-y-3">
              {aboutData.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Zap size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/80">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <h4 className="font-semibold text-white">Education</h4>
              </div>
              {aboutData.education.map((edu, i) => (
                <div key={i} className="text-sm">
                  <p className="text-white font-medium">{edu.degree}</p>
                  <p className="text-muted">{edu.institution}</p>
                  <p className="text-muted text-xs">{edu.year} • {edu.details}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <MapPin size={20} className="text-secondary" />
                </div>
                <h4 className="font-semibold text-white">Location</h4>
              </div>
              <p className="text-sm text-muted">India • Remote-friendly</p>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Clock size={20} className="text-accent" />
                </div>
                <h4 className="font-semibold text-white">Availability</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm text-muted">Open to opportunities</p>
              </div>
            </div>

            <MagneticButton href="/resume/Vineet_Dhiman_Resume.pdf" variant="secondary" className="w-full">
              <Download size={18} /> Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        
      </div>
    </section>
  );
}
