"use client";

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMenu, FiTwitter, FiX } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { toggleTheme, ThemeIcon } = useTheme()

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: <FiGithub className="w-5 h-5" />, href: 'https://github.com/abdullahcxd' },
    { icon: <FiTwitter className="w-5 h-5" />, href: 'https://x.com/sabdullahcxd' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-xl opacity-50" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#"
                className="text-xl font-bold font-poppins bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient"
              >
                AbdullahCXD
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center space-x-4 border-l border-border/50 pl-8">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500" />
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-muted-foreground hover:text-foreground transition-colors"
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
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500" />
                  <div className="relative text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full">
                    <ThemeIcon className="w-5 h-5" />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation Button */}
            <motion.button
              className="md:hidden group relative"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className="relative text-muted-foreground hover:text-foreground transition-colors">
                {isOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
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
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 backdrop-blur-xl rounded-b-2xl" />
                <div className="relative px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ x: 4 }}
                      whileTap={{ x: 0 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="flex items-center space-x-4 px-3 pt-4 border-t border-border/50 mt-4">
                    {socialLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500" />
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative text-muted-foreground hover:text-foreground transition-colors"
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
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500" />
                      <div className="relative text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full">
                        <ThemeIcon className="w-5 h-5" />
                      </div>
                    </motion.button>
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