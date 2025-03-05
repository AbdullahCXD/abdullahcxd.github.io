'use client';

import { useState, useRef, useEffect } from 'react';
import { highlight } from 'sugar-high';
import { FiCheck, FiCopy, FiTerminal, FiDownload, FiMaximize2, FiMinimize2, FiClipboard } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  isPreBlock?: boolean;
  showLineNumbers?: boolean;
  title?: string;
}

export function CodeBlock({
  children,
  className,
  isPreBlock = false,
  showLineNumbers = true,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const code = isPreBlock ? (children as any)?.props?.children : children;
  const language = className?.replace('language-', '') || 'plaintext';

  const copyCode = async () => {
    if (code) {
      setIsLoading(true);
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy code:', error);
      }
      setIsLoading(false);
    }
  };

  const downloadCode = () => {
    if (code) {
      setIsLoading(true);
      try {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code.${language}`;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download code:', error);
      }
      setIsLoading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleLineClick = (lineNumber: number) => {
    setHighlightedLines(prev => 
      prev.includes(lineNumber) 
        ? prev.filter(n => n !== lineNumber)
        : [...prev, lineNumber]
    );
  };

  const lines = code?.toString().split('\n') || [];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (isPreBlock) {
    return (
      <motion.div
        layout
        className={`relative group rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d] shadow-2xl ${
          isFullscreen ? 'fixed inset-4 z-50' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isFullscreen ? { scale: 1 } : { scale: 1 }}
        transition={{ type: 'spring', bounce: 0.2 }}
      >
        {/* Code Block Header */}
        <motion.div 
          layout="position"
          className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]"
        >
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-1.5">
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#ff5f56]"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#27c93f]"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>
            <motion.span 
              className="text-[#7d8590] text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FiTerminal className="w-4 h-4" />
              {title || language}
            </motion.span>
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyCode}
                  disabled={isLoading}
                  className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    {copied ? (
                      <FiCheck className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <FiClipboard className="w-3.5 h-3.5" />
                    )}
                  </motion.div>
                  <span className="relative">{copied ? 'Copied!' : 'Copy'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCode}
                  disabled={isLoading}
                  className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiDownload className="w-3.5 h-3.5" />
                  </motion.div>
                  <span className="relative">Download</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-all group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  {isFullscreen ? (
                    <FiMinimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <FiMaximize2 className="w-3.5 h-3.5" />
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Code Content */}
        <motion.div 
          layout="position" 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {showLineNumbers && lines.length > 1 && (
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[3.5rem] bg-[#161b22] flex flex-col items-center py-4 text-xs text-[#7d8590] select-none border-r border-[#30363d]"
              aria-hidden="true"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {lines.map((_line: string, i: number) => (
                <motion.div
                  key={i + 1}
                  className={`leading-6 h-6 w-full text-center cursor-pointer hover:bg-[#30363d]/50 transition-all ${
                    highlightedLines.includes(i + 1) ? 'bg-[#30363d] text-white' : ''
                  }`}
                  onClick={() => handleLineClick(i + 1)}
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {i + 1}
                </motion.div>
              ))}
            </motion.div>
          )}
          <motion.div
            layout="position"
            className={`${
              showLineNumbers && lines.length > 1 ? 'pl-[3.5rem]' : 'pl-4'
            } pr-4 py-4 overflow-x-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <pre ref={preRef} className="relative">
              <code
                className={`language-${language} text-sm leading-6 text-[#e6edf3] ${
                  isFullscreen ? 'text-base' : ''
                }`}
                dangerouslySetInnerHTML={{
                  __html: highlight(code?.toString() || '')
                }}
              />
            </pre>
          </motion.div>
        </motion.div>

        {/* Fullscreen Overlay */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
              onClick={toggleFullscreen}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <span className="relative inline-block">
      <motion.code
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="font-mono text-sm px-2 py-1 rounded-md bg-[#161b22] text-[#e6edf3] border border-[#30363d]/50 shadow-sm inline-block relative group"
        dangerouslySetInnerHTML={{
          __html: highlight(code?.toString() || '')
        }}
      />
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </span>
  );
} 