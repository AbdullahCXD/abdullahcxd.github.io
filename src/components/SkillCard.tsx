"use client";

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

export interface SkillCardProps {
  name: string
  icon: string | IconType
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

const levelColors = {
  Beginner: 'from-primary/20 to-primary/10 border-primary/20',
  Intermediate: 'from-secondary/20 to-secondary/10 border-secondary/20',
  Advanced: 'from-accent/20 to-accent/10 border-accent/20',
  Expert: 'from-destructive/20 to-destructive/10 border-destructive/20',
}

const levelBadgeColors = {
  Beginner: 'bg-primary/10 text-primary border-primary/20',
  Intermediate: 'bg-secondary/10 text-secondary border-secondary/20',
  Advanced: 'bg-accent/10 text-accent border-accent/20',
  Expert: 'bg-destructive/10 text-destructive border-destructive/20',
}

export default function SkillCard({ name, icon, level }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Background blur effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${levelColors[level]} rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000`} />
      
      {/* Card Content */}
      <div className="relative glass-effect rounded-xl p-6 flex flex-col items-center">
        <motion.div 
          className="text-3xl mb-4 relative"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
          transition={{ 
            scale: { duration: 0.2 },
            rotate: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          {typeof icon === 'string' ? (
            <span className="text-4xl">{icon}</span>
          ) : (
            <span className="text-primary">
              {icon({})}
            </span>
          )}
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
        
        <h3 className="font-medium mb-2 font-poppins group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <span className={`text-xs px-2 py-1 rounded-full border ${levelBadgeColors[level]}`}>
          {level}
        </span>
      </div>
    </motion.div>
  )
} 