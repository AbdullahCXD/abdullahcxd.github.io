"use client";

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { smoothScroll } from '@/utils/smoothScroll';

interface ScrollButtonProps {
  targetId: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  showArrow?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border-2 border-primary/50 hover:border-primary hover:bg-primary/10',
  ghost: 'hover:bg-primary/10',
};

export default function ScrollButton({ 
  targetId, 
  variant = 'primary', 
  size = 'md',
  children,
  showArrow = true,
}: ScrollButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll(targetId.replace('#', ''));
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="relative group"
    >
      {/* Gradient glow effect */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient" />
      
      {/* Button */}
      <motion.button
        onClick={handleClick}
        className={`
          relative flex items-center gap-2 font-medium leading-none rounded-full
          transition-all duration-300 
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${variant === 'primary' ? 'shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30' : ''}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">{children}</span>
        {showArrow && (
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiArrowDown className={`
              ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}
              transition-transform group-hover:translate-y-0.5
            `} />
          </motion.span>
        )}

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </motion.div>
  );
} 