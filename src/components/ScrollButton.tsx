"use client";

import { motion } from 'framer-motion';
import { smoothScroll } from '@/utils/smoothScroll';

interface ScrollButtonProps {
  targetId: string;
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export default function ScrollButton({ targetId, variant = 'primary', children }: ScrollButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll(targetId.replace('#', ''));
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="relative"
    >
      {variant === 'primary' && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      )}
      <button
        onClick={handleClick}
        className={`relative px-8 py-4 rounded-full flex items-center gap-2 text-lg font-medium leading-none transition-all duration-300 ${
          variant === 'primary'
            ? 'bg-background hover:bg-background/90'
            : 'border border-primary/50 hover:border-primary hover:bg-primary/10'
        }`}
      >
        {children}
      </button>
    </motion.div>
  );
} 