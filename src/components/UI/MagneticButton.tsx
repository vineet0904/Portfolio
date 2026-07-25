import { motion } from 'framer-motion';
import type { ReactNode, RefObject } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  href,
  className = '',
  type = 'button',
}: MagneticButtonProps) {
  const { ref, pos } = useMagnetic<HTMLElement>(0.4);

  const baseClass =
    'magnetic-btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden group';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-secondary text-white neon-glow hover:shadow-[0_0_30px_rgba(123,97,255,0.5)]',
    secondary: 'glass text-white hover:bg-white/10 border border-white/10',
    ghost: 'text-muted hover:text-white',
  };

  const content = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        style={{ x: pos.x, y: pos.y }}
        className={`${baseClass} ${variants[variant]} ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      style={{ x: pos.x, y: pos.y }}
      className={`${baseClass} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
}
