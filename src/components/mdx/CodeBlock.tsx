'use client';

import { useState, useRef } from 'react';
import { highlight } from 'sugar-high';
import { FiCheck, FiCopy, FiTerminal } from 'react-icons/fi';
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

  const lines = code?.toString().split('\n') || [];

  if (isPreBlock) {
    return (
      <div
        className="relative group rounded-lg overflow-hidden bg-[#0d1117] border border-[#30363d]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Code Block Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <span className="text-[#7d8590] text-sm flex items-center gap-2">
              <FiTerminal className="w-4 h-4" />
              {title || language}
            </span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-[#30363d] text-[#7d8590] hover:bg-[#30363d]/80 transition-colors"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy className="w-3.5 h-3.5" />
                    Copy code
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Code Content */}
        <div className="relative">
          {showLineNumbers && lines.length > 1 && (
            <div
              className="absolute left-0 top-0 bottom-0 w-[3.5rem] bg-[#161b22] flex flex-col items-center py-4 text-xs text-[#7d8590] select-none border-r border-[#30363d]"
              aria-hidden="true"
            >
              {lines.map((_line: string, i: number) => (
                <div key={i + 1} className="leading-6 h-6">
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <div
            className={`${showLineNumbers && lines.length > 1 ? 'pl-[3.5rem]' : 'pl-4'} pr-4 py-4 overflow-x-auto`}
          >
            <pre ref={preRef} className="relative">
              <code
                className={`language-${language} text-sm leading-6 text-[#e6edf3]`}
                dangerouslySetInnerHTML={{
                  __html: highlight(code?.toString() || '')
                }}
              />
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <code
      className="font-mono text-sm px-1.5 py-0.5 rounded-md bg-[#161b22] text-[#e6edf3]"
      dangerouslySetInnerHTML={{
        __html: highlight(code?.toString() || '')
      }}
    />
  );
} 