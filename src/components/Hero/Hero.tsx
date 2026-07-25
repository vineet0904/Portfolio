import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import "./hero.css";
import HeroVisual from "./HeroVisual";
import {
  Download,
  FolderGit2,
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import MagneticButton from "@/components/UI/MagneticButton";
import profile from "@/data/profile.json";

/* =========================================================
   FRAMER VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   TYPING EFFECT
========================================================= */

function TypingEffect() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = profile.roles[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === role) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % profile.roles.length);
    } else {
      timer = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? role.substring(0, prev.length - 1)
              : role.substring(0, prev.length + 1)
          );
        },
        deleting ? 45 : 80
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text font-semibold">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
        className="inline-block ml-1 w-[2px] h-6 md:h-8 bg-white align-middle"
      />
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-10 xl:px-16 pt-28 pb-20"
      aria-label="Hero Section"
    >
      {/* Decorative Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-light hero-light-1" />
        <div className="hero-light hero-light-2" />
        <div className="hero-light hero-light-3" />
      </div>



      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1450px] mx-auto grid lg:grid-cols-[1fr_1.08fr] gap-8 xl:gap-12 items-center w-full">
        {/* ================= LEFT ================= */}
        <motion.div
  variants={fadeLeft}
  className="text-center lg:text-left lg:pl-0 xl:-ml-6"
>
          {/* Availability Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-7"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm text-muted">
              Available for AI / ML Engineering Roles
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={fadeUp} className="mb-3">
            <span className="uppercase tracking-[.35em] text-xs text-primary font-semibold">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
  variants={fadeUp}
  className="mt-8 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-display font-black leading-[0.95] tracking-[-0.03em] mb-2"
>
  Hi, I am
</motion.h1>

          <motion.h2
            variants={fadeUp}
className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-display font-black leading-[0.95] tracking-[-0.03em] mb-6"          >
            <span className="gradient-text">Vineet Dhiman</span>
          </motion.h2>

          {/* Typing */}
          <motion.div
            variants={fadeUp}
            className="h-12 text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide mb-8"
          >
            <TypingEffect />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-muted leading-8 text-base md:text-lg mx-auto lg:mx-0 mb-10"
          >
            {profile.bio}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
          >
            <div className="glass-card px-5 py-3">
              <div className="text-2xl font-bold gradient-text">AI</div>
              <div className="text-xs text-muted mt-1">Engineering</div>
            </div>

            <div className="glass-card px-5 py-3">
              <div className="text-2xl font-bold gradient-text">LLM</div>
              <div className="text-xs text-muted mt-1">Applications</div>
            </div>

            <div className="glass-card px-5 py-3">
              <div className="text-2xl font-bold gradient-text">ML</div>
              <div className="text-xs text-muted mt-1">Solutions</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
          >
            <MagneticButton href={profile.resumeUrl} variant="primary">
              <Download size={18} />
              Download Resume
            </MagneticButton>

            <MagneticButton onClick={() => scrollTo("projects")} variant="secondary">
              <FolderGit2 size={18} />
              View Projects
            </MagneticButton>

            <MagneticButton onClick={() => scrollTo("contact")} variant="ghost">
              <MessageCircle size={18} />
              Let's Talk
            </MagneticButton>
          </motion.div>

          {/* Bottom Row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center lg:justify-between gap-6 max-w-xl mx-auto lg:mx-0"
          >
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={profile.social[0].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group glass-card w-12 h-12 rounded-2xl flex items-center justify-center"
              >
                <Github size={20} className="transition-transform duration-300 group-hover:rotate-12" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={profile.social[1].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group glass-card w-12 h-12 rounded-2xl flex items-center justify-center"
              >
                <Linkedin size={20} className="transition-transform duration-300 group-hover:rotate-12" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={profile.social[2].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group glass-card w-12 h-12 rounded-2xl flex items-center justify-center"
              >
                <Instagram size={20} className="transition-transform duration-300 group-hover:rotate-12" />
              </motion.a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl glass-card flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>

              <div>
                <div className="text-sm text-white font-medium">{profile.location}</div>
                <div className="text-xs text-muted">Open to Remote & On-site</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT ================= */}
      <motion.div
  variants={scaleIn}
  className="hero-visual-wrap"
>
  <HeroVisual />
</motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="scroll-indicator"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ height: [18, 28, 18] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="scroll-line"
        />
        <ArrowRight size={16} className="rotate-90 text-primary" />
      </motion.div>
    </section>
  );
}

/* =========================================================
   HERO VISUAL
   All rings, the orbit path, and particles are sized as
   percentages of one fixed-size wrapper (.hero-visual),
   so everything stays concentric and the profile image
   stays perfectly centered at any breakpoint.
========================================================= */

