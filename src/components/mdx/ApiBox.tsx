'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCopy, FiCheck } from 'react-icons/fi';

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
  GET: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  POST: 'bg-green-500/10 text-green-500 border-green-500/20',
  PUT: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  DELETE: 'bg-red-500/10 text-red-500 border-red-500/20',
  PATCH: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
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

  const copyEndpoint = () => {
    navigator.clipboard.writeText(endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/5 mb-4">
      {/* API Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${methodConfig[method]}`}>
            {method}
          </span>
          <code className="font-mono text-sm">{endpoint}</code>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyEndpoint}
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
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
              <FiChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      {/* API Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border"
          >
            <div className="p-4 space-y-6">
              {/* Description */}
              {description && (
                <div className="text-sm text-muted-foreground">{description}</div>
              )}

              {/* Parameters */}
              {parameters.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Parameters</h3>
                  <div className="grid gap-2">
                    {parameters.map((param) => (
                      <div
                        key={param.name}
                        className="text-sm p-2 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <span className="font-mono font-medium">{param.name}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                            {param.type}
                          </span>
                          {param.required && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-destructive/10 text-destructive">
                              Required
                            </span>
                          )}
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {param.description}
                          {param.default && (
                            <span className="ml-1 text-xs">
                              (Default: <code className="text-primary">{param.default}</code>)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Headers */}
              {headers.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Headers</h3>
                  <div className="grid gap-2">
                    {headers.map((header) => (
                      <div
                        key={header.name}
                        className="text-sm p-2 rounded-md bg-muted/20 flex flex-col sm:flex-row sm:items-center gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <span className="font-mono font-medium">{header.name}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                            {header.type}
                          </span>
                        </div>
                        <div className="flex-1 text-muted-foreground">
                          {header.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Responses */}
              {responses.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Responses</h3>
                  <div className="grid gap-2">
                    {responses.map((response) => (
                      <div
                        key={response.status}
                        className="text-sm p-2 rounded-md bg-muted/20 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded-md ${
                            response.status < 300
                              ? 'bg-green-500/10 text-green-500'
                              : response.status < 400
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}>
                            {response.status}
                          </span>
                          <span className="text-muted-foreground">{response.description}</span>
                        </div>
                        {response.example && (
                          <pre className="font-mono text-xs bg-muted/30 p-2 rounded-md overflow-x-auto">
                            {response.example}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example */}
              {(example?.request || example?.response) && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Example</h3>
                  {example.request && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">Request</div>
                      <pre className="font-mono text-xs bg-muted/30 p-2 rounded-md overflow-x-auto">
                        {example.request}
                      </pre>
                    </div>
                  )}
                  {example.response && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">Response</div>
                      <pre className="font-mono text-xs bg-muted/30 p-2 rounded-md overflow-x-auto">
                        {example.response}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 