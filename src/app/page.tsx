'use client';

import { AboutCommand } from '@/components/commands/about';
import { ContactCommand } from '@/components/commands/contact';
import { HelpCommand } from '@/components/commands/help';
import { InformationalFrame } from '@/components/commands/informational';
import { ProjectsCommand } from '@/components/commands/projects';
import { SkillsCommand } from '@/components/commands/skills';
import { ThemeCommand } from '@/components/commands/theme';
import { WelcomeMessage } from '@/components/commands/welcome';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import React, { useState, useEffect, useRef } from 'react';

export interface HistoryElement {
  type: string,
  content: React.ReactNode
}

export interface CommandContext {
  executeCommand: (cmd: string) => void;
}

interface CommandInfo {
  name: string;
  description: string;
  category: string;
  args?: ArgumentInfo[];
  examples?: string[];
}

interface ArgumentInfo {
  name: string;
  description: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'option';
  options?: string[];
  default?: any;
}

interface ParsedCommand {
  command: string;
  args: Record<string, any>;
  flags: Record<string, boolean>;
  rawArgs: string[];
}

function TerminalContent() {
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState<CommandInfo[]>([]);
  const [suggestionType, setSuggestionType] = useState<'commands' | 'args'>('commands');
  const [currentCommandSuggestions, setCurrentCommandSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();

  // Enhanced command definitions with arguments
  const commandsInfo: CommandInfo[] = [
    { 
      name: 'help', 
      description: 'Show available commands and usage', 
      category: 'system',
      args: [
        { name: 'command', description: 'Get detailed help for specific command', required: false, type: 'string' }
      ],
      examples: ['help', 'help about', 'help theme']
    },
    { 
      name: 'about', 
      description: 'Learn about me and my background', 
      category: 'personal',
      args: [
        { name: 'section', description: 'Show specific section', required: false, type: 'option', options: ['experience', 'education', 'summary'] }
      ],
      examples: ['about', 'about --section experience', 'about --section education']
    },
    { 
      name: 'skills', 
      description: 'View my technical skills and expertise', 
      category: 'professional',
      args: [
        { name: 'category', description: 'Filter by skill category', required: false, type: 'option', options: ['frontend', 'backend', 'tools', 'languages'] },
        { name: 'level', description: 'Filter by skill level', required: false, type: 'option', options: ['beginner', 'intermediate', 'advanced', 'expert'] }
      ],
      examples: ['skills', 'skills --category frontend', 'skills --level advanced', 'skills --category backend --level expert']
    },
    { 
      name: 'projects', 
      description: 'Browse my portfolio projects', 
      category: 'professional',
      args: [
        { name: 'filter', description: 'Filter projects by technology', required: false, type: 'string' },
        { name: 'limit', description: 'Number of projects to show', required: false, type: 'number', default: 10 },
        { name: 'sort', description: 'Sort projects by criteria', required: false, type: 'option', options: ['date', 'name', 'popularity'] }
      ],
      examples: ['projects', 'projects --filter react', 'projects --limit 5', 'projects --sort date --limit 3']
    },
    { 
      name: 'contact', 
      description: 'Get my contact information', 
      category: 'personal',
      args: [
        { name: 'method', description: 'Show specific contact method', required: false, type: 'option', options: ['email', 'linkedin', 'github', 'twitter'] }
      ],
      examples: ['contact', 'contact --method email', 'contact --method linkedin']
    },
    { 
      name: 'theme', 
      description: 'Change terminal theme and appearance', 
      category: 'settings',
      args: [
        { name: 'name', description: 'Theme name to apply', required: false, type: 'option', options: ['dark', 'light', 'matrix', 'cyberpunk', 'ocean'] },
        { name: 'list', description: 'List available themes', required: false, type: 'boolean' }
      ],
      examples: ['theme', 'theme --list', 'theme --name matrix', 'theme --name cyberpunk']
    },
    { 
      name: 'info', 
      description: 'System information and details', 
      category: 'system',
      args: [
        { name: 'verbose', description: 'Show detailed system information', required: false, type: 'boolean' }
      ],
      examples: ['info', 'info --verbose']
    },
    { 
      name: 'clear', 
      description: 'Clear the terminal screen', 
      category: 'system',
      examples: ['clear']
    },
    {
      name: 'echo',
      description: 'Display text to the terminal',
      category: 'system',
      args: [
        { name: 'text', description: 'Text to display', required: true, type: 'string' },
        { name: 'color', description: 'Text color', required: false, type: 'option', options: ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'] }
      ],
      examples: ['echo "Hello World"', 'echo "Colored text" --color green']
    }
  ];

  // Parse command with arguments
  const parseCommand = (input: string): ParsedCommand => {
    const parts = input.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const rest = parts.slice(1);
    
    const args: Record<string, any> = {};
    const flags: Record<string, boolean> = {};
    const rawArgs: string[] = [];
    
    for (let i = 0; i < rest.length; i++) {
      const part = rest[i];
      
      if (part.startsWith('--')) {
        // Long flag (--flag or --key=value or --key value)
        const flagName = part.substring(2);
        if (flagName.includes('=')) {
          const [key, value] = flagName.split('=', 2);
          args[key] = value;
        } else {
          // Check if next part is a value
          if (i + 1 < rest.length && !rest[i + 1].startsWith('-')) {
            args[flagName] = rest[i + 1];
            i++; // Skip next part as it's the value
          } else {
            flags[flagName] = true;
          }
        }
      } else if (part.startsWith('-') && part.length > 1) {
        // Short flag
        const flagName = part.substring(1);
        flags[flagName] = true;
      } else {
        // Positional argument
        rawArgs.push(part);
      }
    }
    
    return { command, args, flags, rawArgs };
  };

  // Get argument suggestions for current command
  const getArgumentSuggestions = (input: string): string[] => {
    const parsed = parseCommand(input);
    const cmdInfo = commandsInfo.find(cmd => cmd.name === parsed.command);
    
    if (!cmdInfo || !cmdInfo.args) return [];
    
    const suggestions: string[] = [];
    
    // Add available argument flags
    cmdInfo.args.forEach(arg => {
      const flagName = `--${arg.name}`;
      if (!parsed.args[arg.name] && !input.includes(flagName)) {
        if (arg.type === 'boolean') {
          suggestions.push(flagName);
        } else if (arg.options) {
          arg.options.forEach(option => {
            suggestions.push(`${flagName} ${option}`);
          });
        } else {
          suggestions.push(`${flagName} <${arg.type}>`);
        }
      }
    });
    
    return suggestions;
  };

  // Auto-focus input when clicking anywhere on terminal
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestionsRef.current && suggestionsRef.current.contains(e.target as Node)) {
        return;
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      type: 'output',
      content: (
        <WelcomeMessage args={{}} ctx={{
          executeCommand
        }} />
      )
    };
    setHistory([welcomeMessage]);
  }, []);

  // Enhanced filtering logic
  useEffect(() => {
    if (currentInput.trim() === '') {
      setFilteredCommands([]);
      setShowSuggestions(false);
      setSuggestionType('commands');
      return;
    }

    const input = currentInput.toLowerCase().trim();
    const parts = input.split(/\s+/);
    const firstWord = parts[0];
    
    // Check if we're typing a command or arguments
    const existingCommand = commandsInfo.find(cmd => cmd.name === firstWord);
    
    if (existingCommand && parts.length > 1) {
      // We're typing arguments for an existing command
      const argSuggestions = getArgumentSuggestions(input);
      setCurrentCommandSuggestions(argSuggestions);
      setSuggestionType('args');
      setShowSuggestions(argSuggestions.length > 0);
    } else {
      // We're typing a command name
      const filtered = commandsInfo.filter(cmd => {
        const cmdName = cmd.name.toLowerCase();
        const cmdDesc = cmd.description.toLowerCase();
        
        if (cmdName.startsWith(firstWord)) return true;
        if (cmdName.includes(firstWord)) return true;
        if (cmdDesc.includes(firstWord)) return true;
        
        // Fuzzy matching
        let inputIndex = 0;
        for (let i = 0; i < cmdName.length && inputIndex < firstWord.length; i++) {
          if (cmdName[i] === firstWord[inputIndex]) {
            inputIndex++;
          }
        }
        return inputIndex === firstWord.length;
      }).sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(firstWord.toLowerCase());
        const bStarts = b.name.toLowerCase().startsWith(firstWord.toLowerCase());
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return a.name.localeCompare(b.name);
      });

      setFilteredCommands(filtered);
      setSuggestionType('commands');
      setShowSuggestions(filtered.length > 0);
    }
    
    setSelectedSuggestion(0);
  }, [currentInput]);

  const commands: Record<string, (parsed: ParsedCommand) => React.ReactNode> = {
    help: (parsed) => <HelpCommand ctx={{ executeCommand }} args={parsed.args} />,
    about: (parsed) => <AboutCommand ctx={{ executeCommand }} args={parsed.args} />,
    skills: (parsed) => <SkillsCommand ctx={{ executeCommand }} args={parsed.args} />,
    projects: (parsed) => <ProjectsCommand ctx={{ executeCommand }} args={parsed.args} />,
    contact: (parsed) => <ContactCommand ctx={{ executeCommand }} args={parsed.args} />,
    theme: (parsed) => <ThemeCommand ctx={{ executeCommand }} args={parsed.args} />,
    info: (parsed) => <InformationalFrame ctx={{ executeCommand }} args={parsed.args} />,
    clear: () => null,
    echo: (parsed) => {
      const text = parsed.rawArgs.join(' ') || parsed.args.text || '';
      const color = parsed.args.color;
      const colorMap: Record<string, string> = {
        red: '#ff6b6b',
        green: '#51cf66',
        blue: '#339af0',
        yellow: '#ffd43b',
        cyan: '#22d3ee',
        magenta: '#e879f9'
      };
      
      return (
        <div style={{ color: color ? colorMap[color] || currentTheme.foreground : currentTheme.foreground }}>
          {text}
        </div>
      );
    }
  };

  const executeCommand = (input: string) => {
    const parsed = parseCommand(input);
    
    // Hide suggestions
    setShowSuggestions(false);

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: input }]);

    if (parsed.command === 'clear') {
      setHistory([]);
      return;
    }

    // Validate command
    const cmdInfo = commandsInfo.find(cmd => cmd.name === parsed.command);
    if (!cmdInfo) {
      setHistory(prev => [...prev, {
        type: 'output',
        content: (
          <div style={{ color: currentTheme.error }}>
            Command not found: {parsed.command}
            <br />
            <span style={{ color: currentTheme.muted }}>Type 'help' to see available commands.</span>
          </div>
        )
      }]);
      return;
    }

    // Validate required arguments
    if (cmdInfo.args) {
      const missingRequired = cmdInfo.args
        .filter(arg => arg.required && !parsed.args[arg.name] && parsed.rawArgs.length === 0)
        .map(arg => arg.name);
      
      if (missingRequired.length > 0) {
        setHistory(prev => [...prev, {
          type: 'output',
          content: (
            <div style={{ color: currentTheme.error }}>
              Missing required arguments: {missingRequired.join(', ')}
              <br />
              <span style={{ color: currentTheme.muted }}>
                Usage: {parsed.command} {cmdInfo.args?.map(arg => 
                  arg.required ? `--${arg.name} <${arg.type}>` : `[--${arg.name}]`
                ).join(' ')}
              </span>
            </div>
          )
        }]);
        return;
      }
    }

    // Execute command
    const commandFn = commands[parsed.command];
    if (commandFn) {
      const result = commandFn(parsed);
      if (result !== null) {
        setHistory(prev => [...prev, { type: 'output', content: result }]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (showSuggestions) {
      const suggestions = suggestionType === 'commands' ? filteredCommands : currentCommandSuggestions;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestion(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestion(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
          
        case 'Tab':
          e.preventDefault();
          if (suggestionType === 'commands') {
            const selectedCmd = filteredCommands[selectedSuggestion];
            if (selectedCmd) {
              setCurrentInput(selectedCmd.name + ' ');
              setShowSuggestions(false);
            }
          } else {
            const selectedArg = currentCommandSuggestions[selectedSuggestion];
            if (selectedArg) {
              const parts = currentInput.split(/\s+/);
              const newInput = parts[0] + ' ' + selectedArg;
              setCurrentInput(newInput);
              setShowSuggestions(false);
            }
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          setShowSuggestions(false);
          break;
          
        case 'Enter':
          e.preventDefault();
          if (suggestionType === 'commands' && filteredCommands[selectedSuggestion]) {
            const cmd = filteredCommands[selectedSuggestion].name;
            setCurrentInput(cmd + ' ');
            setShowSuggestions(false);
          } else if (suggestionType === 'args' && currentCommandSuggestions[selectedSuggestion]) {
            const parts = currentInput.split(/\s+/);
            const newInput = parts[0] + ' ' + currentCommandSuggestions[selectedSuggestion];
            executeCommand(newInput);
            setCurrentInput('');
          } else if (currentInput.trim()) {
            executeCommand(currentInput);
            setCurrentInput('');
          }
          break;
      }
    } else if (e.key === 'Enter' && currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleSuggestionClick = (item: any) => {
    if (suggestionType === 'commands') {
      setCurrentInput(item.name + ' ');
    } else {
      const parts = currentInput.split(/\s+/);
      setCurrentInput(parts[0] + ' ' + item);
    }
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return currentTheme.secondary || currentTheme.primary;
      case 'personal': return currentTheme.accent || currentTheme.primary;
      case 'professional': return currentTheme.success || currentTheme.primary;
      case 'settings': return currentTheme.warning || currentTheme.primary;
      default: return currentTheme.muted;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ 
          backgroundColor: currentTheme.primary + '30',
          color: currentTheme.primary,
          fontWeight: 'bold'
        }}>
          {part}
        </span>
      ) : part
    ));
  };

  return (
    <div
      className="min-h-screen font-mono overflow-hidden transition-colors duration-300 relative"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.foreground
      }}
    >
      <div
        ref={terminalRef}
        className="h-screen overflow-y-auto p-4 pb-20 transition-colors duration-300"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${currentTheme.scrollbar} ${currentTheme.background}`
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4" style={{ color: currentTheme.muted }}>
            portfolio@terminal:~$ - {currentTheme.displayName} theme
          </div>
        </div>

        {/* Command History */}
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div key={index}>
              {entry.type === 'input' && (
                <div className="flex items-center gap-2">
                  <span style={{ color: currentTheme.primary }}>❯</span>
                  <span style={{ color: currentTheme.foreground }}>{entry.content}</span>
                </div>
              )}
              {entry.type === 'output' && (
                <div className="ml-4 mt-2 mb-4">
                  {entry.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Input */}
        <div className="flex items-center gap-2 mt-4 relative">
          <span style={{ color: currentTheme.primary }}>❯</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent border-none outline-none transition-colors duration-300"
              style={{ color: currentTheme.foreground }}
              placeholder="Type a command with arguments... (try 'help', 'theme --list', 'echo hello --color green')"
              autoFocus
              autoComplete="off"
            />
            
            {/* Enhanced Autocomplete Suggestions */}
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute top-8 left-0 right-0 z-50 rounded-lg shadow-2xl border backdrop-blur-sm"
                style={{
                  backgroundColor: currentTheme.background + 'f0',
                  borderColor: currentTheme.primary + '30',
                  boxShadow: `0 8px 32px ${currentTheme.primary}20`
                }}
              >
                <div className="p-2 text-xs font-semibold border-b flex justify-between" style={{ 
                  color: currentTheme.muted,
                  borderColor: currentTheme.primary + '20'
                }}>
                  <span>
                    {suggestionType === 'commands' 
                      ? `Available Commands (${filteredCommands.length})`
                      : `Arguments for '${currentInput.split(/\s+/)[0]}'`
                    }
                  </span>
                  {suggestionType === 'commands' && (
                    <span className="text-xs">Try adding arguments after selecting</span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {suggestionType === 'commands' ? (
                    filteredCommands.map((cmd, index) => (
                      <div
                        key={cmd.name}
                        onClick={() => handleSuggestionClick(cmd)}
                        className={`p-3 cursor-pointer transition-all duration-150 group ${
                          index === selectedSuggestion ? '' : ''
                        }`}
                        style={{
                          backgroundColor: index === selectedSuggestion 
                            ? currentTheme.primary + '20' 
                            : 'transparent',
                          borderLeft: index === selectedSuggestion 
                            ? `3px solid ${currentTheme.primary}` 
                            : '3px solid transparent'
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm" style={{ 
                              color: index === selectedSuggestion 
                                ? currentTheme.primary 
                                : currentTheme.foreground 
                            }}>
                              {highlightMatch(cmd.name, currentInput.split(/\s+/)[0])}
                            </span>
                            <span 
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{
                                backgroundColor: getCategoryColor(cmd.category) + '20',
                                color: getCategoryColor(cmd.category)
                              }}
                            >
                              {cmd.category}
                            </span>
                          </div>
                          <div className="text-xs mt-1" style={{ color: currentTheme.muted }}>
                            {cmd.description}
                          </div>
                          {cmd.examples && (
                            <div className="text-xs mt-1 opacity-70" style={{ color: currentTheme.muted }}>
                              Examples: {cmd.examples.slice(0, 2).join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    currentCommandSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`p-3 cursor-pointer transition-all duration-150 font-mono text-sm ${
                          index === selectedSuggestion ? '' : ''
                        }`}
                        style={{
                          backgroundColor: index === selectedSuggestion 
                            ? currentTheme.primary + '20' 
                            : 'transparent',
                          borderLeft: index === selectedSuggestion 
                            ? `3px solid ${currentTheme.primary}` 
                            : '3px solid transparent',
                          color: index === selectedSuggestion 
                            ? currentTheme.primary 
                            : currentTheme.foreground
                        }}
                      >
                        {suggestion}
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 text-xs border-t flex justify-between" style={{ 
                  color: currentTheme.muted,
                  borderColor: currentTheme.primary + '20'
                }}>
                  <span>↑↓ navigate</span>
                  <span>Tab to complete</span>
                  <span>Enter to run</span>
                  <span>Esc to close</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cursor */}
        <div
          className="inline-block w-2 h-5 animate-pulse ml-4 mt-1 transition-colors duration-300"
          style={{ backgroundColor: currentTheme.cursor }}
        ></div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: ${currentTheme.background};
        }
        div::-webkit-scrollbar-thumb {
          background: ${currentTheme.scrollbar};
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.primary};
        }
        
        /* Smooth scrolling for suggestions */
        .suggestions-container {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

export default function TerminalPortfolio() {
  return (
    <ThemeProvider>
      <TerminalContent />
    </ThemeProvider>
  );
}