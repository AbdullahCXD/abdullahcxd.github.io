'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCopy, FiCheck, FiLoader } from 'react-icons/fi';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiParameter {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

interface ApiResponse {
  status: number;
  description: string;
  example?: string;
}

interface ApiBoxProps {
  method: HttpMethod;
  endpoint: string;
  description?: string;
  parameters?: ApiParameter[];
  headers?: ApiParameter[];
  responses?: ApiResponse[];
  example?: {
    request?: string;
    response?: string;
  };
}

const methodConfig = {
  GET: {
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    gradient: 'from-blue-500/5 to-transparent',
    shadow: 'shadow-blue-500/10',
  },
  POST: {
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
    gradient: 'from-green-500/5 to-transparent',
    shadow: 'shadow-green-500/10',
  },
  PUT: {
    color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    gradient: 'from-yellow-500/5 to-transparent',
    shadow: 'shadow-yellow-500/10',
  },
  DELETE: {
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    gradient: 'from-red-500/5 to-transparent',
    shadow: 'shadow-red-500/10',
  },
  PATCH: {
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    gradient: 'from-purple-500/5 to-transparent',
    shadow: 'shadow-purple-500/10',
  },
};

export function ApiBox({
  method,
  endpoint,
  description,
  parameters = [],
  headers = [],
  responses = [],
  example,
}: ApiBoxProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyEndpoint = async () => {
    try {
      setIsLoading(true);
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy endpoint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`rounded-lg overflow-hidden border border-border bg-gradient-to-b ${methodConfig[method].gradient} transition-shadow duration-300 ${isHovered ? methodConfig[method].shadow : ''}`}
    >
      {/* API Header */}
      <motion.div
        className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border backdrop-blur-sm"
        animate={{ backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-2 py-1 rounded-md text-xs font-medium ${methodConfig[method].color}`}
          >
            {method}
          </motion.span>
          <motion.code
            className="font-mono text-sm select-all"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {endpoint}
          </motion.code>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={copyEndpoint}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md ${
              copied
                ? 'bg-green-500/10 text-green-500'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            } transition-colors disabled:opacity-50`}
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <FiLoader className="w-3.5 h-3.5" />
              </motion.span>
            ) : copied ? (
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
          </motion.button>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <FiChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* API Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 space-y-6"
            >
              {/* Description */}
              {description && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-muted-foreground"
                >
                  {description}
                </motion.div>
              )}

              {/* Parameters */}
              {parameters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-medium">Parameters</h3>
                  <div className="grid gap-2">
                    {parameters.map((param, index) => (
                      <motion.div
                        key={param.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                        className="text-sm p-2 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <span className="font-mono font-medium">{param.name}</span>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
                          >
                            {param.type}
                          </motion.span>
                          {param.required && (
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-destructive/10 text-destructive"
                            >
                              Required
                            </motion.span>
                          )}
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {param.description}
                          {param.default && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-1 text-xs"
                            >
                              (Default: <code className="text-primary">{param.default}</code>)
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Headers */}
              {headers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-medium">Headers</h3>
                  <div className="grid gap-2">
                    {headers.map((header, index) => (
                      <motion.div
                        key={header.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                        className="text-sm p-2 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <span className="font-mono font-medium">{header.name}</span>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
                          >
                            {header.type}
                          </motion.span>
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {header.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Responses */}
              {responses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-medium">Responses</h3>
                  <div className="grid gap-2">
                    {responses.map((response, index) => (
                      <motion.div
                        key={response.status}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                        className="text-sm p-2 rounded-md bg-muted/20 space-y-2 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-1.5 py-0.5 text-xs font-medium rounded-md ${
                              response.status < 300
                                ? 'bg-green-500/10 text-green-500'
                                : response.status < 400
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}
                          >
                            {response.status}
                          </motion.span>
                          <span className="text-muted-foreground">{response.description}</span>
                        </div>
                        {response.example && (
                          <motion.pre
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-mono text-xs bg-muted/30 p-2 rounded-md overflow-x-auto"
                          >
                            {response.example}
                          </motion.pre>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Example */}
              {(example?.request || example?.response) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-medium">Example</h3>
                  {example.request && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-1"
                    >
                      <div className="text-xs font-medium text-muted-foreground">Request</div>
                      <motion.pre
                        whileHover={{ scale: 1.01 }}
                        className="font-mono text-xs bg-muted/30 p-2 rounded-md overflow-x-auto"
                      >
                        {example.request}
                      </motion.pre>
                    </motion.div>
                  )}
                  {example.response && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-1"
                    >
                      <div className="text-xs font-medium text-muted-foreground">Response</div>
                      <motion.pre
                        whileHover={{ scale: 1.01 }}
                        className="font-mono text-xs bg-muted/30 p-2 rounded-md overflow-x-auto"
                      >
                        {example.response}
                      </motion.pre>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 