'use client';

import { useState, useRef, useEffect } from 'react';
import { highlight } from 'sugar-high';
import { FiCheck, FiCopy, FiTerminal, FiDownload, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
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
  const preRef = useRef<HTMLPreElement>(null);
  const code = isPreBlock ? (children as any)?.props?.children : children;
  const language = className?.replace('language-', '') || 'plaintext';

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    if (code) {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code.${language}`;
      a.click();
      window.URL.revokeObjectURL(url);
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
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[#7d8590] text-sm flex items-center gap-2">
              <FiTerminal className="w-4 h-4" />
              {title || language}
            </span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-colors"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCode}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-colors"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  <span>Download</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-colors"
                >
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
        <motion.div layout="position" className="relative">
          {showLineNumbers && lines.length > 1 && (
            <div
              className="absolute left-0 top-0 bottom-0 w-[3.5rem] bg-[#161b22] flex flex-col items-center py-4 text-xs text-[#7d8590] select-none border-r border-[#30363d]"
              aria-hidden="true"
            >
              {lines.map((_line: string, i: number) => (
                <motion.div
                  key={i + 1}
                  className={`leading-6 h-6 w-full text-center cursor-pointer hover:bg-[#30363d]/50 transition-colors ${
                    highlightedLines.includes(i + 1) ? 'bg-[#30363d] text-white' : ''
                  }`}
                  onClick={() => handleLineClick(i + 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          )}
          <motion.div
            layout="position"
            className={`${
              showLineNumbers && lines.length > 1 ? 'pl-[3.5rem]' : 'pl-4'
            } pr-4 py-4 overflow-x-auto`}
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
      </motion.div>
    );
  }

  return (
    <motion.code
      whileHover={{ scale: 1.02 }}
      className="font-mono text-sm px-2 py-1 rounded-md bg-[#161b22] text-[#e6edf3] border border-[#30363d]/50 shadow-sm inline-block"
      dangerouslySetInnerHTML={{
        __html: highlight(code?.toString() || '')
      }}
    />
  );
} 