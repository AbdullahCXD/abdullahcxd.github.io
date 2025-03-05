'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/utils/mdx';
import { FiArrowRight, FiBook, FiCode, FiTerminal } from 'react-icons/fi';
import { useRef } from 'react';

interface AnimatedContentProps {
    categories: Category[];
}

export function AnimatedContent({ categories }: AnimatedContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0]);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    };
      
    const staggerContainer = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const getCategoryIcon = (slug: string) => {
        switch (slug) {
            case 'getting-started':
                return <FiBook className="w-5 h-5" />;
            case 'components':
                return <FiCode className="w-5 h-5" />;
            case 'api':
                return <FiTerminal className="w-5 h-5" />;
            default:
                return <FiBook className="w-5 h-5" />;
        }
    };
    
    return (
        <div ref={containerRef} className="relative">
            {/* Background Effects */}
            <motion.div 
                className="absolute inset-0 -z-10"
                style={{ y: backgroundY, opacity: backgroundOpacity }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0,transparent_100%)]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            </motion.div>

            <div className="space-y-16">
                {/* Hero Section */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="text-center space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-20 h-20 rounded-full border-4 border-primary/20 mx-auto mb-6 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 animate-gradient" />
                    </motion.div>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient"
                    >
                        Documentation
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        Everything you need to know about the portfolio website's components, APIs, and development guidelines.
                    </motion.p>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.slug}
                            variants={fadeInUp}
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <motion.div 
                                className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-xl blur"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 0.75 }}
                                transition={{ duration: 0.3 }}
                            />
                            <Link href={`/docs/${category.slug}/${category.items[0]?.slug || ''}`}>
                                <motion.div 
                                    className="relative glass-effect rounded-xl p-6 h-full space-y-4 hover:border-primary/50 transition-all"
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <motion.div 
                                            className="p-2 rounded-lg bg-primary/10 text-primary"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {getCategoryIcon(category.slug)}
                                        </motion.div>
                                        <motion.span 
                                            className="text-sm text-muted-foreground"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {category.items.length} articles
                                        </motion.span>
                                    </div>
                                    <div>
                                        <motion.h2 
                                            className="text-xl font-semibold group-hover:text-primary transition-colors"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {category.name}
                                        </motion.h2>
                                        <motion.p 
                                            className="mt-2 text-sm text-muted-foreground line-clamp-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {category.items[0]?.description || ''}
                                        </motion.p>
                                    </div>
                                    <motion.div 
                                        className="flex items-center text-sm text-primary"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <span>Browse articles</span>
                                        <motion.div
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FiArrowRight className="ml-2 w-4 h-4" />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Getting Started Section */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="relative glass-effect rounded-xl p-8 overflow-hidden"
                >
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            opacity: [0.3, 0.5]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <div className="relative">
                        <motion.div 
                            variants={fadeInUp} 
                            className="max-w-xl space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <motion.h2 
                                className="text-2xl font-bold font-poppins"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                Ready to Get Started?
                            </motion.h2>
                            <motion.p 
                                className="text-muted-foreground"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Begin your journey with our comprehensive installation guide and learn how to set up your portfolio website.
                            </motion.p>
                            <motion.div 
                                className="pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href="/docs/getting-started/installation"
                                    className="group relative inline-flex items-center px-6 py-3 rounded-lg overflow-hidden"
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-100 group-hover:opacity-90 transition-opacity"
                                        initial={false}
                                        animate={{ scale: [0.95, 1.05, 0.95] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                    <span className="relative text-primary-foreground font-medium">
                                        Start Building
                                        <motion.span
                                            className="inline-block ml-2"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FiArrowRight className="w-4 h-4" />
                                        </motion.span>
                                    </span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 