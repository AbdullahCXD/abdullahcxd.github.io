"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiBookOpen, FiExternalLink, FiGithub } from 'react-icons/fi'

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
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      {/* Background blur effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-1000" />
      
      {/* Card Content */}
      <div className="relative glass-effect rounded-xl overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover overlay with links */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/90 rounded-full text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiExternalLink className="w-6 h-6" />
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/90 rounded-full text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>
            )}
            {docsUrl && (
              <motion.a
                href={docsUrl}
                className="p-3 bg-background/90 rounded-full text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiBookOpen className="w-6 h-6" />
              </motion.a>
            )}
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-poppins group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 