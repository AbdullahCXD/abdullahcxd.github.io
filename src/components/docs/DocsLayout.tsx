"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
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
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <button
          onClick={() => toggleCategory(pathString)}
          className="flex-1 flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span>{category.name}</span>
          <motion.span
            animate={{ rotate: expandedCategories.includes(pathString) ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="group-hover:text-primary"
          >
            <FiChevronRight className="w-4 h-4" />
          </motion.span>
        </button>
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
          {filteredItems.length}
        </span>
      </div>
      <AnimatePresence>
        {expandedCategories.includes(pathString) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
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
            {filteredItems.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${pathString}/${doc.slug}`}
                className={`block py-2 text-sm transition-colors rounded-lg px-4 hover:bg-muted ${
                  pathname === `/docs/${pathString}/${doc.slug}`
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {doc.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 md:z-0 md:static w-72 bg-background border-r border-border`}
        >
          <div className="h-full pt-16">
            <nav className="px-4 py-6 space-y-6 h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Search and Toggle */}
              <div className="space-y-2">
                <div className="relative group">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-muted-foreground/70"
                  />
                </div>
                <button
                  onClick={toggleAllCategories}
                  className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {expandedCategories.length === categories.length ? 'Collapse all' : 'Expand all'}
                </button>
              </div>

              {/* Categories */}
              {categories.map((category) => (
                <CategoryItem
                  key={category.slug}
                  category={category}
                  searchQuery={searchQuery}
                  expandedCategories={expandedCategories}
                  toggleCategory={toggleCategory}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 