'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiCopy, FiTerminal, FiInfo, FiChevronDown, FiClipboard } from 'react-icons/fi';

interface CommandArgument {
  name: string;
  description: string;
  required?: boolean;
  default?: string;
}

interface CommandOption {
  flag: string;
  shortFlag?: string;
  description: string;
  type?: string;
  default?: string;
}

interface CommandBoxProps {
  command: string;
  description?: string;
  args?: CommandArgument[];
  options?: CommandOption[];
  example?: string;
}

export function CommandBox({
  command,
  description,
  args = [],
  options = [],
  example,
}: CommandBoxProps) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyCommand = async () => {
    if (command) {
      setIsLoading(true);
      try {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy command:', error);
      }
      setIsLoading(false);
    }
  };

  const baseCommand = command.split(' ')[0];
  const fullCommand = `${baseCommand} ${args.map(arg => 
    arg.required ? `<${arg.name}>` : `[${arg.name}]`
  ).join(' ')}`;

  return (
    <motion.div 
      className="rounded-lg overflow-hidden border border-border bg-muted/5 mb-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Gradient Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Command Header */}
      <motion.div 
        className="relative flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FiTerminal className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="text-sm font-medium">{baseCommand}</span>
        </motion.div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setShowDetails(!showDetails)}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:text-foreground transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <FiInfo className="w-3.5 h-3.5" />
            <span className="relative">{showDetails ? 'Hide details' : 'Show details'}</span>
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="w-3.5 h-3.5 ml-1" />
            </motion.div>
          </motion.button>
          <motion.button
            onClick={copyCommand}
            disabled={isLoading}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
        </div>
      </motion.div>

      {/* Command Content */}
      <motion.div 
        className="relative p-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Basic Command Display */}
        <motion.div 
          className="font-mono text-sm bg-muted/30 p-3 rounded-md overflow-x-auto relative group"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <span className="relative">{fullCommand}</span>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}

        {/* Detailed Information */}
        <AnimatePresence mode="wait">
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 overflow-hidden"
            >
              {/* Arguments */}
              {args.length > 0 && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-sm font-medium">Arguments</h3>
                  <div className="grid gap-2">
                    {args.map((arg, index) => (
                      <motion.div
                        key={arg.name}
                        className="text-sm p-3 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2 relative group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                          animate={{ scale: [0.95, 1.05, 0.95] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <span className="font-mono font-medium relative">
                            {arg.required ? <>&lt;{arg.name}&gt;</> : <>[{arg.name}]</>}
                          </span>
                          {arg.required && (
                            <motion.span 
                              className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-destructive/10 text-destructive"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              Required
                            </motion.span>
                          )}
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {arg.description}
                          {arg.default && (
                            <motion.span 
                              className="ml-1 text-xs"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              (Default: <code className="text-primary">{arg.default}</code>)
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Options */}
              {options.length > 0 && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-sm font-medium">Options</h3>
                  <div className="grid gap-2">
                    {options.map((option, index) => (
                      <motion.div
                        key={option.flag}
                        className="text-sm p-3 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2 relative group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                          animate={{ scale: [0.95, 1.05, 0.95] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <div className="font-mono space-x-1">
                            <span className="text-primary">{option.flag}</span>
                            {option.shortFlag && (
                              <span className="text-muted-foreground">|</span>
                            )}
                            {option.shortFlag && (
                              <span className="text-primary">{option.shortFlag}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {option.description}
                          {option.type && (
                            <motion.span 
                              className="ml-1 text-xs"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              (<code className="text-primary">{option.type}</code>)
                            </motion.span>
                          )}
                          {option.default && (
                            <motion.span 
                              className="ml-1 text-xs"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              Default: <code className="text-primary">{option.default}</code>
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Example */}
              {example && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-medium">Example</h3>
                  <motion.div 
                    className="font-mono text-sm bg-muted/30 p-3 rounded-md overflow-x-auto relative group"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <span className="relative">{example}</span>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Border Gradient Effect */}
      <motion.div
        className="absolute inset-0 border-2 rounded-lg border-transparent bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)' }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
      />
    </motion.div>
  );
} 