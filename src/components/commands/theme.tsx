import { useTheme } from '@/providers/ThemeProvider';
import { AllCommandContext } from '@/types/context';
import { useState } from 'react';
import { SiCanvas } from 'react-icons/si';

export function ThemeCommand({ ctx }: AllCommandContext) {
  const { currentTheme, themes, setTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThemeChange = async (themeName: string) => {
    if (currentTheme.name === themeName) return;
    
    setIsTransitioning(true);
    
    // Add a slight delay for smooth transition effect
    setTimeout(() => {
      setTheme(themeName);
      setIsTransitioning(false);
      setPreviewTheme(null);
    }, 150);
  };

  const handleThemePreview = (themeName: string) => {
    if (currentTheme.name !== themeName) {
      setPreviewTheme(themeName);
    }
  };

  const clearPreview = () => {
    setPreviewTheme(null);
  };

  const getThemeColors = (theme: any) => ({
    background: theme.background,
    foreground: theme.foreground || theme.text,
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    success: theme.success,
    warning: theme.warning || theme.accent,
    muted: theme.muted
  });

  return (
    <div 
      className="p-6 rounded-lg border transition-all duration-300 hover:shadow-lg animate-fadeIn"
      style={{ 
        backgroundColor: currentTheme.background,
        borderColor: currentTheme.primary + '40',
        boxShadow: `0 4px 20px ${currentTheme.primary}20`,
        color: currentTheme.primary || currentTheme.foreground
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div 
          className="p-2 rounded-full transition-all duration-300"
          style={{ backgroundColor: currentTheme.primary + '20' }}
        >
          <span className="text-xl"><SiCanvas /></span>
        </div>
        <div>
          <h2 
            className="text-2xl font-bold transition-colors duration-300"
            style={{ color: currentTheme.primary }}
          >
            Terminal Themes
          </h2>
          <p 
            className="text-sm opacity-80"
            style={{ color: currentTheme.primary || currentTheme.foreground }}
          >
            Customize your terminal experience
          </p>
        </div>
      </div>

      {/* Current Theme Info */}
      <div 
        className="mb-6 p-4 rounded-lg border transition-all duration-300"
        style={{ 
          backgroundColor: currentTheme.primary + '10',
          borderColor: currentTheme.primary + '30'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p 
              className="text-sm opacity-80 mb-1"
              style={{ color: currentTheme.primary || currentTheme.foreground }}
            >
              Currently Active
            </p>
            <p 
              className="font-semibold text-lg"
              style={{ color: currentTheme.primary }}
            >
              {currentTheme.displayName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(getThemeColors(currentTheme)).slice(0, 5).map(([key, color]) => (
              <div
                key={key}
                className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                style={{ 
                  backgroundColor: color,
                  borderColor: currentTheme.primary + '30'
                }}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </div>
        </div>
        
        {isTransitioning && (
          <div className="flex items-center gap-2 text-sm opacity-70">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.primary }}
            />
            <span>Applying theme...</span>
          </div>
        )}
      </div>

      {/* Theme Selection */}
      <div className="mb-8">
        <p 
          className="mb-4 text-sm font-medium"
          style={{ color: currentTheme.primary || currentTheme.foreground }}
        >
          Choose your preferred terminal theme:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {themes.map((theme, index) => {
            const isActive = currentTheme.name === theme.name;
            const isPreviewed = previewTheme === theme.name;
            
            return (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                onMouseEnter={() => handleThemePreview(theme.name)}
                onMouseLeave={clearPreview}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isActive ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  backgroundColor: isActive 
                    ? `${theme.primary}15` 
                    : isPreviewed 
                      ? `${theme.primary}08`
                      : 'transparent',
                  borderColor: isActive 
                    ? theme.primary 
                    : isPreviewed 
                      ? theme.primary + '60'
                      : theme.primary + '30',
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Theme Preview Colors */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {Object.entries(getThemeColors(theme)).slice(0, 6).map(([key, color], colorIndex) => (
                    <div
                      key={key}
                      className="transition-all duration-200 group-hover:scale-110"
                      style={{
                        width: key === 'background' ? '20px' : '16px',
                        height: key === 'background' ? '20px' : '16px',
                        backgroundColor: color,
                        borderRadius: key === 'background' ? '6px' : '50%',
                        border: key === 'background' ? `2px solid ${theme.foreground || theme.primary}` : 'none',
                        animationDelay: `${(index * 50) + (colorIndex * 20)}ms`
                      }}
                      title={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  ))}
                </div>
                
                {/* Theme Name */}
                <div 
                  className="text-sm font-medium mb-2 group-hover:scale-105 transition-transform"
                  style={{ 
                    color: isActive || isPreviewed ? theme.primary : currentTheme.primary || currentTheme.foreground
                  }}
                >
                  {theme.displayName}
                </div>

                {/* Theme Description */}
                <div 
                  className="text-xs opacity-70 leading-relaxed"
                  style={{ color: currentTheme.primary || currentTheme.foreground }}
                >
                  {getThemeDescription(theme.name)}
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 flex items-center justify-center">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center border-2"
                      style={{ 
                        backgroundColor: theme.primary,
                        borderColor: currentTheme.background
                      }}
                    >
                      <span className="text-xs font-bold" style={{ color: currentTheme.background }}>✓</span>
                    </div>
                  </div>
                )}

                {/* Preview Indicator */}
                {isPreviewed && !isActive && (
                  <div className="absolute top-2 right-2">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: theme.primary }}
                    />
                  </div>
                )}

                {/* Hover Effect Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}10, transparent)`
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme Stats */}
      <div 
        className="mb-6 p-4 rounded-lg"
        style={{ backgroundColor: currentTheme.secondary + '15' }}
      >
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div 
              className="text-xl font-bold"
              style={{ color: currentTheme.primary }}
            >
              {themes.length}
            </div>
            <div 
              className="text-xs opacity-80"
              style={{ color: currentTheme.primary || currentTheme.foreground }}
            >
              Available Themes
            </div>
          </div>
          <div>
            <div 
              className="text-xl font-bold"
              style={{ color: currentTheme.secondary }}
            >
              ∞
            </div>
            <div 
              className="text-xs opacity-80"
              style={{ color: currentTheme.primary || currentTheme.foreground }}
            >
              Customization Options
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <div 
              className="flex justify-center text-xl font-bold"
              style={{ color: currentTheme.accent }}
            >
              <SiCanvas />
            </div>
            <div 
              className="text-xs opacity-80"
              style={{ color: currentTheme.primary || currentTheme.foreground }}
            >
              Visual Experience
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="flex flex-wrap gap-3 pt-4 border-t"
        style={{ borderColor: currentTheme.primary + '20' }}
      >
        <button 
          onClick={() => ctx.executeCommand('help')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: currentTheme.primary + '20',
            color: currentTheme.primary,
            border: `1px solid ${currentTheme.primary}40`
          }}
        >
          <span>📚</span>
          Back to Help
        </button>
        
        <button 
          onClick={() => ctx.executeCommand('about')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:scale-105"
          style={{
            borderColor: currentTheme.accent,
            color: currentTheme.accent,
            backgroundColor: 'transparent'
          }}
        >
          <span>👋</span>
          About Me
        </button>

        <button 
          onClick={() => ctx.executeCommand('projects')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: currentTheme.secondary + '20',
            color: currentTheme.secondary
          }}
        >
          <span>🚀</span>
          View Projects
        </button>
      </div>

      {/* Pro Tip */}
      <div 
        className="mt-6 p-3 rounded-lg text-center"
        style={{ backgroundColor: currentTheme.accent + '10' }}
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <span>💡</span>
          <span 
            style={{ color: currentTheme.primary || currentTheme.foreground }}
            className="opacity-80"
          >
            Hover over themes to preview them before applying!
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper function to get theme descriptions
function getThemeDescription(themeName: string): string {
  const descriptions: Record<string, string> = {
    'default': 'Classic terminal experience with balanced colors',
    'dark': 'Deep dark theme perfect for late-night coding',
    'light': 'Clean and bright theme for daytime productivity',
    'monokai': 'Popular theme inspired by Sublime Text',
    'dracula': 'Gothic elegance with purple accents',
    'nord': 'Arctic, north-bluish color palette',
    'solarized-dark': 'Precision colors for machines and people',
    'solarized-light': 'Light variant of the precision color scheme',
    'github': 'Clean theme inspired by GitHub\'s interface',
    'material': 'Google\'s Material Design principles',
    'one-dark': 'Atom\'s iconic One Dark theme',
    'gruvbox': 'Retro groove color scheme',
    'tokyo-night': 'Dark theme inspired by Tokyo\'s neon lights',
    'catppuccin': 'Soothing pastel theme for cozy coding',
  };
  
  return descriptions[themeName] || 'Beautiful color scheme for your terminal';
}