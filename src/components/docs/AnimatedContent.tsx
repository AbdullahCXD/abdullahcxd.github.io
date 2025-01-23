'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/utils/mdx';
import { FiArrowRight, FiBook, FiCode, FiTerminal } from 'react-icons/fi';

interface AnimatedContentProps {
    categories: Category[];
}

export function AnimatedContent({ categories }: AnimatedContentProps) {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };
      
    const staggerContainer = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1
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
        <div className="relative">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0,transparent_100%)]" />
            </div>

            <div className="space-y-16">
                {/* Hero Section */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="text-center space-y-6"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient"
                    >
                        Documentation
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
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
                    {categories.map((category) => (
                        <motion.div
                            key={category.slug}
                            variants={fadeInUp}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-1000" />
                            <Link href={`/docs/${category.slug}/${category.items[0]?.slug || ''}`}>
                                <div className="relative glass-effect rounded-xl p-6 h-full space-y-4 hover:border-primary/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            {getCategoryIcon(category.slug)}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {category.items.length} articles
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h2>
                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                            {category.items[0]?.description || ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-sm text-primary">
                                        <span>Browse articles</span>
                                        <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
                    <div className="relative">
                        <motion.div variants={fadeInUp} className="max-w-xl space-y-4">
                            <h2 className="text-2xl font-bold font-poppins">Ready to Get Started?</h2>
                            <p className="text-muted-foreground">
                                Begin your journey with our comprehensive installation guide and learn how to set up your portfolio website.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/docs/getting-started/installation"
                                    className="group inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    Start Building
                                    <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 