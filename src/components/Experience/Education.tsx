import { motion } from 'framer-motion';
import { GraduationCap, MapPin, CheckCircle } from "lucide-react";
import SectionHeading from '@/components/UI/SectionHeading';
import educationData from "@/data/education.json";

export default function Education() {
  return (
    <section id="education" className="relative z-10 section-pad px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Education" subtitle="Academic Journey" icon={<GraduationCap size={14} className="text-primary" />} />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-1/2" />

          {educationData.education.map((edu, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="relative mb-12"
              >
                <div className={`pl-12 md:pl-0 ${isLeft ? 'md:pr-[50%]' : 'md:ml-[50%]'}`}>
                  <div className="absolute left-4 md:left-1/2 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary md:-translate-x-1/2 neon-glow z-10">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                  </div>

                  <div className={`glass-card p-6 group hover:scale-[1.02] transition-transform ${isLeft ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1 text-muted text-xs">
                        <MapPin size={12} /> {edu.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-semibold text-white">{edu.degree}</h3>
                    <p className="text-primary font-medium text-sm mb-4">{edu.institute}</p>

                    <ul className="space-y-2">
                      {edu.highlights.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    
  );
}
