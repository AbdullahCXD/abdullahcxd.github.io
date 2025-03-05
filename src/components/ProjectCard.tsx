"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiBookOpen, FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  docsUrl?: string
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  technologies,
  liveUrl,
  githubUrl,
  docsUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="group relative"
    >
      {/* Background glow effect */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient" />
      
      {/* Card Content */}
      <div className="relative glass-effect rounded-xl overflow-hidden border border-border/50">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover overlay with links */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/90 rounded-full text-primary hover:text-primary/80 transition-colors hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View live site"
              >
                <FiExternalLink className="w-6 h-6" />
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/90 rounded-full text-primary hover:text-primary/80 transition-colors hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View source code"
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>
            )}
            {docsUrl && (
              <motion.a
                href={docsUrl}
                className="p-3 bg-background/90 rounded-full text-primary hover:text-primary/80 transition-colors hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View documentation"
              >
                <FiBookOpen className="w-6 h-6" />
              </motion.a>
            )}
          </div>
        </div>
        
        {/* Content Container */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-poppins group-hover:text-gradient transition-all duration-300 flex items-center gap-2">
              {title}
              <FiArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-0.5 text-xs font-medium bg-primary/5 text-primary rounded-full border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 