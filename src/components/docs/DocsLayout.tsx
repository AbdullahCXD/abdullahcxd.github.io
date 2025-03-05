"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiChevronRight, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { Category } from '@/utils/mdx';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

interface DocsLayoutProps {
  children: React.ReactNode;
  categories: Category[];
}

interface CategoryItemProps {
  category: Category;
  searchQuery: string;
  expandedCategories: string[];
  toggleCategory: (slug: string) => void;
  parentPath?: string[];
}

function CategoryItem({ category, searchQuery, expandedCategories, toggleCategory, parentPath = [] }: CategoryItemProps) {
  const pathname = usePathname();
  const currentPath = [...parentPath, category.slug];
  const pathString = currentPath.join('/');

  // Filter items based on search query
  const filteredItems = category.items.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter nested categories based on search query
  const filteredCategories = category.categories?.map(cat => ({
    ...cat,
    items: cat.items.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0 || (cat.categories && cat.categories.length > 0));

  // If nothing matches the search query, don't render this category
  if (filteredItems.length === 0 && (!filteredCategories || filteredCategories.length === 0)) {
    return null;
  }

  return (
    <motion.div 
      className="space-y-1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <motion.button
          onClick={() => toggleCategory(pathString)}
          className="flex-1 flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          whileHover={{ x: 4 }}
          whileTap={{ x: 0 }}
        >
          <span>{category.name}</span>
          <motion.span
            animate={{ rotate: expandedCategories.includes(pathString) ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group-hover:text-primary"
          >
            <FiChevronRight className="w-4 h-4" />
          </motion.span>
        </motion.button>
        <motion.span 
          className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {filteredItems.length}
        </motion.span>
      </div>
      <AnimatePresence mode="wait">
        {expandedCategories.includes(pathString) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1 overflow-hidden pl-4"
          >
            {/* Render nested categories first */}
            {filteredCategories?.map((nestedCategory) => (
              <CategoryItem
                key={nestedCategory.slug}
                category={nestedCategory}
                searchQuery={searchQuery}
                expandedCategories={expandedCategories}
                toggleCategory={toggleCategory}
                parentPath={currentPath}
              />
            ))}
            
            {/* Then render documents */}
            {filteredItems.map((doc, index) => (
              <motion.div
                key={doc.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={`/docs/${pathString}/${doc.slug}`}
                  className={`block py-2 text-sm transition-all rounded-lg px-4 hover:bg-muted relative group ${
                    pathname === `/docs/${pathString}/${doc.slug}`
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <span className="relative">{doc.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DocsLayout({ children, categories }: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map(c => c.slug)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { toggleTheme, ThemeIcon } = useTheme();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest - lastScrollY.current > 0;
    const isOverThreshold = latest > 100;
    setHidden(direction && isOverThreshold);
    lastScrollY.current = latest;
  });

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleCategory = (categoryPath: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryPath)
        ? prev.filter(path => path !== categoryPath)
        : [...prev, categoryPath]
    );
  };

  const toggleAllCategories = () => {
    function getAllCategoryPaths(cats: Category[], parentPath: string[] = []): string[] {
      return cats.flatMap(category => {
        const currentPath = [...parentPath, category.slug];
        const paths = [currentPath.join('/')];
        if (category.categories) {
          paths.push(...getAllCategoryPaths(category.categories, currentPath));
        }
        return paths;
      });
    }

    const allPaths = getAllCategoryPaths(categories);
    setExpandedCategories(prev =>
      prev.length === allPaths.length ? [] : allPaths
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-primary text-primary-foreground rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: hidden ? 100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
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
      </motion.button>

      <div className="flex min-h-screen pt-16">
        {/* Sidebar Backdrop */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-all duration-300 ease-in-out z-50 md:z-0 md:static w-72 bg-background border-r border-border`}
          initial={{ x: -288 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-full pt-16">
            <nav className="px-4 py-6 space-y-6 h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Search and Toggle */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  >
                    <FiSearch className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </motion.div>
                  <motion.input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-muted-foreground/70 transition-all"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <motion.button
                  onClick={toggleAllCategories}
                  className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <span className="relative">
                    {expandedCategories.length >= categories.length ? 'Collapse all' : 'Expand all'}
                  </span>
                </motion.button>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <CategoryItem
                      category={category}
                      searchQuery={searchQuery}
                      expandedCategories={expandedCategories}
                      toggleCategory={toggleCategory}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </nav>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.main 
          className="flex-1 min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
} 