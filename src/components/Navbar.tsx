"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { FiGithub, FiMenu, FiTwitter, FiX, FiArrowRight } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { toggleTheme, ThemeIcon } = useTheme()
  const { scrollY } = useScroll()
  let lastScrollY = 0

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest - lastScrollY > 0
    const isOverThreshold = latest > 100
    setHidden(direction && isOverThreshold)
    lastScrollY = latest
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/#' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Docs', href: '/docs' },
  ]

  const socialLinks = [
    { icon: <FiGithub className="w-5 h-5" />, href: 'https://github.com/abdullahcxd', label: 'GitHub' },
    { icon: <FiTwitter className="w-5 h-5" />, href: 'https://x.com/sabdullahcxd', label: 'Twitter' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect' : ''
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-xl opacity-50" />
          <div className={`absolute inset-0 ${scrolled ? 'bg-background/80 backdrop-blur-xl' : ''}`} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Link
                href="/"
                className="text-xl font-bold font-poppins text-gradient relative group"
              >
                <span className="relative z-10">AbdullahCXD</span>
                <motion.span
                  className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-2"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <motion.span
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-primary/60 to-secondary/60 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="flex items-center space-x-4 border-l border-border/50 pl-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative"
                  >
                    <motion.span
                      className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  onClick={toggleTheme}
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle theme"
                >
                  <motion.span
                    className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full">
                    <ThemeIcon className="w-5 h-5" />
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Mobile Navigation Button */}
            <motion.button
              className="md:hidden group relative"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative text-muted-foreground hover:text-foreground transition-colors">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", bounce: 0.2 }}
                className="md:hidden overflow-hidden relative"
              >
                <div className="glass-effect rounded-b-2xl border border-border/50">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        whileTap={{ x: 0 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5 group"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.name}</span>
                          <motion.div
                            initial={{ x: -4, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="text-primary"
                          >
                            <FiArrowRight className="w-4 h-4" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div 
                      className="flex items-center space-x-4 px-3 pt-4 border-t border-border/50 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {socialLinks.map((link, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="group relative"
                        >
                          <motion.span
                            className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          />
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={link.label}
                          >
                            {link.icon}
                          </Link>
                        </motion.div>
                      ))}
                      <motion.button
                        onClick={toggleTheme}
                        className="group relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle theme"
                      >
                        <motion.span
                          className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="relative text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full">
                          <ThemeIcon className="w-5 h-5" />
                        </div>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
} 