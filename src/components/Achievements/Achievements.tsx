import { motion } from 'framer-motion';
import { Trophy, Award, Github, BookOpen, Code } from 'lucide-react';
import SectionHeading from '@/components/UI/SectionHeading';
import achievementsData from '@/data/achievements.json';

const iconMap: Record<string, typeof Trophy> = {
  Trophy, Award, Github, BookOpen, Code,
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative z-10 section-pad px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Achievements" subtitle="Milestones" icon={<Trophy size={14} className="text-primary" />} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievementsData.achievements.map((item, i) => {
            const Icon = iconMap[item.icon] || Trophy;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted">{item.date}</span>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded-md bg-secondary/15 text-secondary text-xs font-medium mb-2">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-display font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-primary text-sm mb-2">{item.org}</p>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
