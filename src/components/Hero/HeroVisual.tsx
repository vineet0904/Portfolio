import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const orbitSkills = [
  { label: "Python", angle: -90 },
  { label: "TensorFlow", angle: -45 },
  { label: "PyTorch", angle: 0 },
  { label: "RAG", angle: 45 },
  { label: "LLM", angle: 90 },
  { label: "Agents", angle: 135 },
  { label: "GenAI", angle: 180 },
  { label: "NLP", angle: 225 },
];
const ORBIT_RADIUS = 260;

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 8 + Math.random() * 84,
  y: 8 + Math.random() * 84,
  size: 2 + Math.random() * 4,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 2,
}));

export default function HeroVisual() {
  return (
    <div className="hero-visual">

      {/* Ambient Glow */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      {/* OUTER RING */}
      <motion.div
        className="orbit orbit-outer"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* MIDDLE RING */}
      <motion.div
        className="orbit orbit-middle"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* INNER RING */}
      <motion.div
        className="orbit orbit-inner"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* CENTER IMAGE */}
      <motion.div
        className="hero-core"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src="/images/profile.png"
          alt="Vineet Dhiman"
        />
      </motion.div>

      {/* Orbit Skill Cards */}
      {orbitSkills.map((item, index) => {
        const rad = (item.angle * Math.PI) / 180;

        const x = Math.cos(rad) * ORBIT_RADIUS;
        const y = Math.sin(rad) * ORBIT_RADIUS;

        return (
          <div
            key={item.label}
            className="skill-node-wrap"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <motion.div
              className="skill-node"
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.08,
              }}
            >
              <Sparkles size={14} />
              <span>{item.label}</span>
            </motion.div>
          </div>
        );
      })}

      {/* Pulse Ring */}
      <motion.div
        className="hero-pulse"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.18],
          opacity: [0.35, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="hero-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.9, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small Orbit Glow */}
      <motion.div
        className="orbit-glow orbit-glow-1"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
      </motion.div>

      <motion.div
        className="orbit-glow orbit-glow-2"
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
      </motion.div>

    </div>
  );
}