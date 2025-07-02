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

function TerminalContent() {
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();

  // Auto-focus input when clicking anywhere on terminal
  useEffect(() => {
    const handleClick = () => {
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
        <WelcomeMessage ctx={{
          executeCommand
        }} />
      )
    };
    setHistory([welcomeMessage]);
  }, []);

  const commands: Record<string, () => React.ReactNode> = {
    help: () => (
      <HelpCommand />
    ),

    about: () => (
      <AboutCommand ctx={{
        executeCommand
      }} />
    ),

    skills: () => (
      <SkillsCommand ctx={{
        executeCommand
      }} />
    ),

    projects: () => (
      <ProjectsCommand ctx={{
        executeCommand
      }} />
    ),

    contact: () => (
      <ContactCommand ctx={{
        executeCommand
      }} />
    ),

    theme: () => (
      <ThemeCommand ctx={{
        executeCommand
      }} />
    ),

    info: () => (
      <InformationalFrame />
    ),

    clear: () => null
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: command }]);

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    // Execute command
    const output = commands[command];
    if (output) {
      setHistory(prev => [...prev, { type: 'output', content: output() }]);
    } else {
      setHistory(prev => [...prev, {
        type: 'output',
        content: (
          <div style={{ color: currentTheme.error }}>
            Command not found: {command}
            <br />
            <span style={{ color: currentTheme.muted }}>Type 'help' to see available commands.</span>
          </div>
        )
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  return (
    <div
      className="min-h-screen font-mono overflow-hidden transition-colors duration-300"
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
                  <span style={{ color: currentTheme.primary }}>$</span>
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
        <div className="flex items-center gap-2 mt-4">
          <span style={{ color: currentTheme.primary }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none transition-colors duration-300"
            style={{ color: currentTheme.foreground }}
            placeholder="Type a command..."
            autoFocus
          />
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