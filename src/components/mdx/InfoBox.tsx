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
  },
  warning: {
    icon: FiAlertTriangle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  success: {
    icon: FiCheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  tip: {
    icon: FiHelpCircle,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
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
  const { icon: Icon, color, bg, border } = typeConfig[type];

  return (
    <div className={`rounded-lg overflow-hidden border ${border} ${bg} mb-4`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${expandable ? 'cursor-pointer' : ''}`}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className={`text-sm font-medium ${color}`}>{title}</span>
        </div>
        {expandable && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className={`w-4 h-4 ${color}`} />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {(!expandable || isExpanded) && (
          <motion.div
            initial={expandable ? { height: 0, opacity: 0 } : undefined}
            animate={{ height: 'auto', opacity: 1 }}
            exit={expandable ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 text-sm text-muted-foreground prose prose-sm max-w-none prose-p:leading-normal prose-p:my-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 