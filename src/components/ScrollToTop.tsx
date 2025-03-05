"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { smoothScroll } from '@/utils/smoothScroll';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      
      // Calculate scroll progress
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);

      // Show button when page is scrolled 500px
      setIsVisible(scrolled > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    smoothScroll('top');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* Progress circle button */}
          <motion.button
            onClick={scrollToTop}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Background glow */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient" />
            
            {/* Button content */}
            <div className="relative glass-effect rounded-full p-3 flex items-center justify-center">
              {/* Progress circle */}
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  className="text-border"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="transparent"
                  r="20"
                  cx="24"
                  cy="24"
                />
                <motion.circle
                  className="text-primary"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="transparent"
                  r="20"
                  cx="24"
                  cy="24"
                  initial={{ strokeDasharray: "126.92", strokeDashoffset: "126.92" }}
                  animate={{ 
                    strokeDashoffset: 126.92 - (scrollProgress / 100) * 126.92,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
              
              {/* Arrow icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiArrowUp className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
                </motion.div>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50 text-sm whitespace-nowrap"
              >
                Scroll to top
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 