'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiCopy, FiTerminal, FiInfo } from 'react-icons/fi';

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

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseCommand = command.split(' ')[0];
  const fullCommand = `${baseCommand} ${args.map(arg => 
    arg.required ? `<${arg.name}>` : `[${arg.name}]`
  ).join(' ')}`;

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/5 mb-4">
      {/* Command Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <FiTerminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{baseCommand}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FiInfo className="w-3.5 h-3.5" />
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
          <button
            onClick={copyCommand}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {copied ? (
              <>
                <FiCheck className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <FiCopy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Command Content */}
      <div className="p-4 space-y-4">
        {/* Basic Command Display */}
        <div className="font-mono text-sm bg-muted/30 p-3 rounded-md overflow-x-auto">
          {fullCommand}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {/* Detailed Information */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Arguments */}
              {args.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Arguments</h3>
                  <div className="grid gap-2">
                    {args.map((arg) => (
                      <div
                        key={arg.name}
                        className="text-sm p-2 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <span className="font-mono font-medium">
                            {arg.required ? <>&lt;{arg.name}&gt;</> : <>[{arg.name}]</>}
                          </span>
                          {arg.required && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-destructive/10 text-destructive">
                              Required
                            </span>
                          )}
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {arg.description}
                          {arg.default && (
                            <span className="ml-1 text-xs">
                              (Default: <code className="text-primary">{arg.default}</code>)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Options */}
              {options.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Options</h3>
                  <div className="grid gap-2">
                    {options.map((option) => (
                      <div
                        key={option.flag}
                        className="text-sm p-2 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2"
                      >
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
                            <span className="ml-1 text-xs">
                              (<code className="text-primary">{option.type}</code>)
                            </span>
                          )}
                          {option.default && (
                            <span className="ml-1 text-xs">
                              Default: <code className="text-primary">{option.default}</code>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example */}
              {example && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Example</h3>
                  <div className="font-mono text-sm bg-muted/30 p-3 rounded-md overflow-x-auto">
                    {example}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 