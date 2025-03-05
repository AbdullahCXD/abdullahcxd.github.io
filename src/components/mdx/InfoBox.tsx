'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiAlertTriangle, FiCheckCircle, FiHelpCircle, FiChevronDown } from 'react-icons/fi';

type InfoBoxType = 'info' | 'warning' | 'success' | 'tip';

interface InfoBoxProps {
  type?: InfoBoxType;
  title: string;
  children: React.ReactNode;
  expandable?: boolean;
  defaultExpanded?: boolean;
}

const typeConfig = {
  info: {
    icon: FiInfo,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    gradient: 'from-blue-500/20 to-blue-500/5',
    shadow: 'shadow-blue-500/10',
  },
  warning: {
    icon: FiAlertTriangle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    shadow: 'shadow-yellow-500/10',
  },
  success: {
    icon: FiCheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    gradient: 'from-green-500/20 to-green-500/5',
    shadow: 'shadow-green-500/10',
  },
  tip: {
    icon: FiHelpCircle,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    gradient: 'from-purple-500/20 to-purple-500/5',
    shadow: 'shadow-purple-500/10',
  },
};

export function InfoBox({
  type = 'info',
  title,
  children,
  expandable = false,
  defaultExpanded = true,
}: InfoBoxProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon, color, bg, border, gradient, shadow } = typeConfig[type];

  return (
    <motion.div 
      className={`relative rounded-lg overflow-hidden border ${border} ${bg} mb-4 ${shadow} transition-shadow duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Gradient Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300`}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Header */}
      <motion.div
        className={`relative flex items-center justify-between px-4 py-3 ${
          expandable ? 'cursor-pointer select-none' : ''
        } group`}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
        whileHover={expandable ? { scale: 1.01 } : undefined}
        whileTap={expandable ? { scale: 0.99 } : undefined}
      >
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className={`w-5 h-5 ${color}`} />
          </motion.div>
          <motion.span 
            className={`text-sm font-medium ${color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.span>
        </motion.div>
        {expandable && (
          <motion.div
            animate={{ 
              rotate: isExpanded ? 180 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
            className={`${color} opacity-70 group-hover:opacity-100 transition-opacity`}
          >
            <FiChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {(!expandable || isExpanded) && (
          <motion.div
            initial={expandable ? { height: 0, opacity: 0 } : { opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={expandable ? { height: 0, opacity: 0 } : { opacity: 0 }}
            transition={{ 
              height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, delay: expandable ? 0.1 : 0 }
            }}
          >
            <motion.div 
              className="relative px-4 py-3 text-sm text-muted-foreground prose prose-sm max-w-none prose-p:leading-normal prose-p:my-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Border Gradient Effect */}
      <motion.div
        className={`absolute inset-0 border-2 rounded-lg border-transparent bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 pointer-events-none`}
        style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)' }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
      />
    </motion.div>
  );
} 