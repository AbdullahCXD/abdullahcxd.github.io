"use client";

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiTwitter, FiArrowDown, FiExternalLink } from 'react-icons/fi'
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa'
import { SiTypescript, SiMongodb } from 'react-icons/si'
import { useState, FormEvent } from 'react'
import ProjectCard from '@/components/ProjectCard'
import SkillCard, { SkillCardProps } from '@/components/SkillCard'
import Navbar from '@/components/Navbar'
import ScrollButton from '@/components/ScrollButton'
import ScrollToTop from '@/components/ScrollToTop'

const projects = [
  {
    title: 'Portables',
    description: 'Minecraft Pentesting & Debugging tool that is only used for development purposes.',
    imageUrl: '/project1.jpg',
    technologies: ['TypeScript', 'Node.js', 'Minecraft'],
    liveUrl: 'https://github.com/AbdullahCXD/theportables',
    githubUrl: 'https://github.com/AbdullahCXD/theportables',
  },
]

const skills = [
  { name: 'React', icon: FaReact, level: 'Beginner' },
  { name: 'TypeScript', icon: SiTypescript, level: 'Intermediate' },
  { name: 'Node.js', icon: FaNodeJs, level: 'Intermediate' },
  { name: 'Python', icon: FaPython, level: 'Beginner' },
  { name: 'MongoDB', icon: SiMongodb, level: 'Beginner' },
  { name: 'SQL', icon: FaDatabase, level: 'Beginner' },
] as SkillCardProps[];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:example@example.com?subject=Portfolio Contact Form&body=${encodeURIComponent(message)}\n\nFrom: ${email}`
    window.location.href = mailtoLink
  }

  return (
    <>
      <div id="top" />
      <Navbar />
      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0,transparent_100%)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative space-y-6 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-lg text-muted-foreground font-medium">Welcome to my portfolio</h2>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient font-poppins">
                AbdullahCXD
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              <span className="highlight-text">Full Stack</span> Developer | Beginner UI/UX Designer
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              <ScrollButton targetId="projects" variant="primary">
                View Projects
                <FiArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </ScrollButton>
              <ScrollButton targetId="contact" variant="outline">
                Contact Me
                <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ScrollButton>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <div className="space-y-4 text-center">
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold font-poppins inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  Featured Projects
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Here are some of my recent projects that showcase my skills and experience.
                </motion.p>
              </div>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-4 relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-primary/10 to-transparent blur-3xl opacity-30" />
          </div>
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <div className="space-y-4 text-center">
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold font-poppins inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  Skills & Expertise
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Technologies and tools I work with to bring ideas to life.
                </motion.p>
              </div>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
              >
                {skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32 px-4">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-30" />
          </div>
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <div className="space-y-4 text-center">
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold font-poppins inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  Get In Touch
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Have a question or want to work together? Feel free to reach out!
                </motion.p>
              </div>
              <motion.div
                variants={fadeInUp}
                className="max-w-xl mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-6 glass-effect rounded-2xl p-8">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-background/50 rounded-lg focus:ring-2 focus:ring-primary outline-none border border-border transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-background/50 rounded-lg focus:ring-2 focus:ring-primary outline-none border border-border transition-colors resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative w-full px-6 py-3 bg-background rounded-lg flex items-center justify-center gap-2 text-lg font-medium">
                      <FiMail className="w-4 h-4" />
                      <span>Send Message</span>
                    </div>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center space-x-6">
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link
                    href="https://github.com/abdullahcxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FiGithub className="w-6 h-6" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link
                    href="https://x.com/sabdullahcxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FiTwitter className="w-6 h-6" />
                  </Link>
                </motion.div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  © 2024 AbdullahCXD. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Built with <a href="https://nextjs.org/" title="Next.js">Next.js</a>, <a href="https://tailwindcss.com/" title="Tailwind CSS">Tailwind CSS</a> and <a href="https://framer.com/motion" title="Framer Motion">Framer Motion</a>
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <ScrollToTop />
    </>
  )
}