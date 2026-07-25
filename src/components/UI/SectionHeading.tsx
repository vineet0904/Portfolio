import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  icon,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-5 py-2 mb-4">
        {icon}

        <span className="text-[13px] font-bold uppercase tracking-[0.28em] text-white">
          {title}
        </span>
      </div>

      {/* Main Heading */}
      {subtitle && (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
          {subtitle.split(" ").map((word, index, arr) => (
            <span
              key={index}
              className={
                index === arr.length - 1
                  ? "gradient-text"
                  : "text-white"
              }
            >
              {word}{" "}
            </span>
          ))}
        </h2>
      )}
    </motion.div>
  );
}