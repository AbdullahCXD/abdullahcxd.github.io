import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { AboutCommand } from '@/components/commands/about';
import { ContactCommand } from '@/components/commands/contact';
import { HelpCommand } from '@/components/commands/help';
import { InformationalFrame } from '@/components/commands/informational';
import { ProjectsCommand } from '@/components/commands/projects';
import { SkillsCommand } from '@/components/commands/skills';
import { ThemeCommand } from '@/components/commands/theme';
import { WelcomeMessage } from '@/components/commands/welcome';
import { EchoCommand } from '@/components/commands/echo';
import { InfoCommand } from '@/components/commands/info';
import { HistoryElement, ParsedCommand, CommandInfo } from '@/types/terminal';
import { parseCommand } from '@/lib/commandParser';
import { commandsInfo } from '@/lib/commandRegistry';
import { TerminalHistory } from './TerminalHistory';
import { TerminalInput } from './TerminalInput';

export function Terminal() {
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState<CommandInfo[]>([]);
  const [suggestionType, setSuggestionType] = useState<'commands' | 'args'>('commands');
  const [currentCommandSuggestions, setCurrentCommandSuggestions] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Save history to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem('terminal-history', JSON.stringify(history));
      } catch (e) {
        // Silently fail if sessionStorage is unavailable
      }
    }
  }, [history]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      type: 'output',
      content: (
        <div className='space-y-2'>
          <WelcomeMessage args={{}} ctx={{
            executeCommand
          }} />
          <InformationalFrame args={{}} ctx={{
            executeCommand
          }} />
        </div>
      )
    };
    setHistory([welcomeMessage]);
  }, []);

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
    info: (parsed) => <InfoCommand args={parsed.args} ctx={{ executeCommand }} />,
    echo: (parsed) => <EchoCommand args={parsed.args} ctx={{ executeCommand }} />,
    clear: () => null,
  };

  const executeCommand = (input: string) => {
    const parsed = parseCommand(input);
    
    // Hide suggestions
    setShowSuggestions(false);

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: input }]);

    // Handle clear and quit commands
    if (parsed.command === 'clear' || parsed.command === 'quit') {
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
        <TerminalHistory history={history} theme={currentTheme} />

        {/* Current Input */}
        <TerminalInput
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          selectedSuggestion={selectedSuggestion}
          setSelectedSuggestion={setSelectedSuggestion}
          filteredCommands={filteredCommands}
          currentCommandSuggestions={currentCommandSuggestions}
          suggestionType={suggestionType}
          theme={currentTheme}
          onExecuteCommand={executeCommand}
        />

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
          background: \${currentTheme.background};
        }
        div::-webkit-scrollbar-thumb {
          background: \${currentTheme.scrollbar};
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: \${currentTheme.primary};
        }
        
        /* Smooth scrolling for suggestions */
        .suggestions-container {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}