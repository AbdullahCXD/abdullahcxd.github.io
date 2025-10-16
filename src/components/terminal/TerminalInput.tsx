import { useRef, useEffect } from 'react';
import { CommandInfo, Theme } from '@/types/terminal';
import { commandsInfo } from '@/lib/commandRegistry';

interface TerminalInputProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  selectedSuggestion: number;
  setSelectedSuggestion: (value: number | ((prev: number) => number)) => void;
  filteredCommands: CommandInfo[];
  currentCommandSuggestions: string[];
  suggestionType: 'commands' | 'args';
  theme: Theme;
  onExecuteCommand: (command: string) => void;
}

export function TerminalInput({
  currentInput,
  setCurrentInput,
  showSuggestions,
  setShowSuggestions,
  selectedSuggestion,
  setSelectedSuggestion,
  filteredCommands,
  currentCommandSuggestions,
  suggestionType,
  theme,
  onExecuteCommand,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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
            onExecuteCommand(newInput);
            setCurrentInput('');
          } else if (currentInput.trim()) {
            onExecuteCommand(currentInput);
            setCurrentInput('');
          }
          break;
      }
    } else if (e.key === 'Enter' && currentInput.trim()) {
      onExecuteCommand(currentInput);
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
      case 'system': return theme.secondary || theme.primary;
      case 'personal': return theme.accent || theme.primary;
      case 'professional': return theme.success || theme.primary;
      case 'settings': return theme.warning || theme.primary;
      default: return theme.muted;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ 
          backgroundColor: theme.primary + '30',
          color: theme.primary,
          fontWeight: 'bold'
        }}>
          {part}
        </span>
      ) : part
    ));
  };

  return (
    <div className="flex items-center gap-2 mt-4 relative">
      <span style={{ color: theme.primary }}>❯</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full bg-transparent border-none outline-none transition-colors duration-300"
          style={{ color: theme.foreground }}
          placeholder="Type a command with arguments... (try 'help', 'theme --list', 'echo hello --color green')"
          autoFocus
          autoComplete="off"
        />
        
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-8 left-0 right-0 z-50 rounded-lg shadow-2xl border backdrop-blur-sm"
            style={{
              backgroundColor: theme.background + 'f0',
              borderColor: theme.primary + '30',
              boxShadow: `0 8px 32px ${theme.primary}20`
            }}
          >
            <div className="p-2 text-xs font-semibold border-b flex justify-between" style={{ 
              color: theme.muted,
              borderColor: theme.primary + '20'
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
                    className={`p-3 cursor-pointer transition-all duration-150 group`}
                    style={{
                      backgroundColor: index === selectedSuggestion 
                        ? theme.primary + '20' 
                        : 'transparent',
                      borderLeft: index === selectedSuggestion 
                        ? `3px solid ${theme.primary}` 
                        : '3px solid transparent'
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm" style={{ 
                          color: index === selectedSuggestion 
                            ? theme.primary 
                            : theme.foreground 
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
                      <div className="text-xs mt-1" style={{ color: theme.muted }}>
                        {cmd.description}
                      </div>
                      {cmd.examples && (
                        <div className="text-xs mt-1 opacity-70" style={{ color: theme.muted }}>
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
                    className={`p-3 cursor-pointer transition-all duration-150 font-mono text-sm`}
                    style={{
                      backgroundColor: index === selectedSuggestion 
                        ? theme.primary + '20' 
                        : 'transparent',
                      borderLeft: index === selectedSuggestion 
                        ? `3px solid ${theme.primary}` 
                        : '3px solid transparent',
                      color: index === selectedSuggestion 
                        ? theme.primary 
                        : theme.foreground
                    }}
                  >
                    {suggestion}
                  </div>
                ))
              )}
            </div>
            <div className="p-2 text-xs border-t flex justify-between" style={{ 
              color: theme.muted,
              borderColor: theme.primary + '20'
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
  );
}