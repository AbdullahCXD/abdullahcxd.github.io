"use client";

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiMail, FiGithub, FiTwitter, FiArrowDown, FiExternalLink, FiSend } from 'react-icons/fi'
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa'
import { SiTypescript, SiMongodb } from 'react-icons/si'
import { useState, FormEvent, useRef } from 'react'
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
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const slideInFromLeft = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const slideInFromRight = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: mainRef })
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mailtoLink = `mailto:example@example.com?subject=Portfolio Contact Form&body=${encodeURIComponent(message)}\n\nFrom: ${email}`
    window.location.href = mailtoLink
    
    setIsSubmitting(false)
    setEmail('')
    setMessage('')
  }

  return (
    <>
      <div id="top" />
      <Navbar />
      <main ref={mainRef} className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: backgroundOpacity, scale: backgroundScale }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0,transparent_100%)]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative space-y-8 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-20 h-20 rounded-full border-4 border-primary/20 mx-auto mb-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 animate-gradient" />
              </motion.div>
              <h2 className="text-lg text-muted-foreground font-medium tracking-wide">Welcome to my portfolio</h2>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient font-poppins">
                AbdullahCXD
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              <span className="highlight-text">Full Stack</span> Developer | Beginner UI/UX Designer
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              <ScrollButton targetId="projects" variant="primary" size="lg" showArrow>
                View Projects
              </ScrollButton>
              <ScrollButton targetId="contact" variant="outline" size="lg" showArrow>
                Contact Me
              </ScrollButton>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <div className="space-y-4 text-center">
                <motion.div variants={slideInFromLeft} className="inline-block">
                  <h2 className="text-4xl md:text-5xl font-bold font-poppins inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Featured Projects
                  </h2>
                </motion.div>
                <motion.p
                  variants={slideInFromRight}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Here are some of my recent projects that showcase my skills and experience.
                </motion.p>
              </div>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-4 relative">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-primary/10 to-transparent blur-3xl opacity-30" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          </motion.div>
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <div className="space-y-4 text-center">
                <motion.div variants={slideInFromRight} className="inline-block">
                  <h2 className="text-4xl md:text-5xl font-bold font-poppins inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Skills & Expertise
                  </h2>
                </motion.div>
                <motion.p
                  variants={slideInFromLeft}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Technologies and tools I work with to bring ideas to life.
                </motion.p>
              </div>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 }
                    }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SkillCard {...skill} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32 px-4">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-30" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          </motion.div>
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <div className="space-y-4 text-center">
                <motion.div variants={slideInFromLeft} className="inline-block">
                  <h2 className="text-4xl md:text-5xl font-bold font-poppins inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Get In Touch
                  </h2>
                </motion.div>
                <motion.p
                  variants={slideInFromRight}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Have a question or want to work together? Feel free to reach out!
                </motion.p>
              </div>
              <motion.div
                variants={fadeInUp}
                className="max-w-xl mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-6 glass-effect rounded-2xl p-8 border border-border/50">
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
                      className="w-full px-4 py-3 bg-background/50 rounded-lg focus:ring-2 focus:ring-primary outline-none border border-border/50 transition-all placeholder:text-muted-foreground/50"
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
                      className="w-full px-4 py-3 bg-background/50 rounded-lg focus:ring-2 focus:ring-primary outline-none border border-border/50 transition-all placeholder:text-muted-foreground/50 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative w-full px-6 py-3 bg-background rounded-lg flex items-center justify-center gap-2 text-lg font-medium">
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <FiSend className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center space-x-6">
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link
                    href="https://github.com/abdullahcxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub Profile"
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
                    aria-label="Twitter Profile"
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
                  Built with{" "}
                  <Link href="https://nextjs.org/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Next.js</Link>,{" "}
                  <Link href="https://tailwindcss.com/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Tailwind CSS</Link> and{" "}
                  <Link href="https://framer.com/motion" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Framer Motion</Link>
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Icons made by{" "}
                  <Link href="https://www.flaticon.com/authors/freepik" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Freepik</Link> from{" "}
                  <Link href="https://www.flaticon.com/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">www.flaticon.com</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </footer>
      </main>
      <ScrollToTop />
    </>
  )
}