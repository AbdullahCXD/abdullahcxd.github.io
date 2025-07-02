import { useTheme } from '@/providers/ThemeProvider';
import { AllCommandContext } from '@/types/context';

export function ThemeCommand({ ctx }: AllCommandContext) {
  const { currentTheme, themes, setTheme } = useTheme();

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <div className="text-terminal-muted">
      <div className="text-terminal-success mb-3">Terminal Themes</div>
      <div className="mb-4">
        <p className="mb-3">Current theme: <span className="text-terminal-accent font-semibold">{currentTheme.displayName}</span></p>
        <p className="mb-3 text-sm">Choose your preferred terminal theme:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme.name)}
              className={`group relative px-4 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                currentTheme.name === theme.name
                  ? 'border-terminal-primary bg-terminal-primary/10'
                  : 'border-terminal-muted/30 hover:border-terminal-accent'
              }`}
              style={{
                backgroundColor: currentTheme.name === theme.name ? `${theme.primary}15` : 'transparent',
                borderColor: currentTheme.name === theme.name ? theme.primary : undefined,
              }}
            >
              {/* Theme preview */}
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: theme.background, borderColor: theme.foreground }}
                />
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              
              {/* Theme name */}
              <div 
                className={`text-sm font-medium ${
                  currentTheme.name === theme.name ? 'text-terminal-primary' : 'text-terminal-foreground'
                }`}
              >
                {theme.displayName}
              </div>
              
              {/* Active indicator */}
              {currentTheme.name === theme.name && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-terminal-success rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => ctx.executeCommand('help')}
          className="px-3 py-1 bg-terminal-primary/20 hover:bg-terminal-primary/30 border border-terminal-primary/50 rounded text-terminal-primary text-sm transition-colors"
        >
          Back to Help
        </button>
        <button 
          onClick={() => ctx.executeCommand('about')}
          className="px-3 py-1 bg-terminal-accent/20 hover:bg-terminal-accent/30 border border-terminal-accent/50 rounded text-terminal-accent text-sm transition-colors"
        >
          About Me
        </button>
      </div>
    </div>
  );
}