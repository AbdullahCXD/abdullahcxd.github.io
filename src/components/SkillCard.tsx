"use client";

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

export interface SkillCardProps {
  name: string
  icon: string | IconType
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

const levelConfig = {
  Beginner: {
    colors: 'from-primary/30 via-primary/20 to-primary/10',
    border: 'border-primary/20',
    badge: 'bg-primary/10 text-primary border-primary/20',
    progress: '25%'
  },
  Intermediate: {
    colors: 'from-secondary/30 via-secondary/20 to-secondary/10',
    border: 'border-secondary/20',
    badge: 'bg-secondary/10 text-secondary border-secondary/20',
    progress: '50%'
  },
  Advanced: {
    colors: 'from-accent/30 via-accent/20 to-accent/10',
    border: 'border-accent/20',
    badge: 'bg-accent/10 text-accent border-accent/20',
    progress: '75%'
  },
  Expert: {
    colors: 'from-destructive/30 via-destructive/20 to-destructive/10',
    border: 'border-destructive/20',
    badge: 'bg-destructive/10 text-destructive border-destructive/20',
    progress: '100%'
  },
}

export default function SkillCard({ name, icon, level }: SkillCardProps) {
  const config = levelConfig[level]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="group relative"
    >
      {/* Background glow effect */}
      <div className={`absolute -inset-[2px] bg-gradient-to-br ${config.colors} rounded-xl blur-lg opacity-30 group-hover:opacity-100 transition duration-500`} />
      
      {/* Card Content */}
      <div className="relative glass-effect rounded-xl p-6 flex flex-col items-center border border-border/50">
        {/* Icon Container */}
        <motion.div 
          className="relative mb-4"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          {/* Icon glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.colors} blur-xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
          
          {/* Icon */}
          <div className="relative z-10 text-4xl text-primary transition-colors duration-300">
            {typeof icon === 'string' ? (
              <span>{icon}</span>
            ) : (
              icon({})
            )}
          </div>
        </motion.div>
        
        {/* Name */}
        <motion.h3 
          className="font-medium mb-3 font-poppins group-hover:text-gradient transition-all duration-300"
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
        >
          {name}
        </motion.h3>
        
        {/* Level Badge */}
        <div className="relative w-full mt-2">
          <div className={`h-1 w-full bg-border/20 rounded-full overflow-hidden ${config.border}`}>
            <motion.div
              className={`h-full bg-gradient-to-r ${config.colors}`}
              initial={{ width: 0 }}
              whileInView={{ width: config.progress }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <motion.span 
              className={`text-xs px-2 py-0.5 rounded-full border ${config.badge}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {level}
            </motion.span>
            <motion.span
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {config.progress}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 