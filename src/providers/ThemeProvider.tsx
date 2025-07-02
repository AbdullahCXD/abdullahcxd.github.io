'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  name: string;
  displayName: string;
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
  cursor: string;
  scrollbar: string;
}

export interface ThemeContextType {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeName: string) => void;
}

const themes: Theme[] = [
  {
    name: 'matrix',
    displayName: 'Matrix',
    background: '#000000',
    foreground: '#00ff00',
    primary: '#00ff00',
    secondary: '#008000',
    accent: '#00cc00',
    muted: '#666666',
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff0000',
    cursor: '#00ff00',
    scrollbar: '#00ff00',
  },
  {
    name: 'ocean',
    displayName: 'Ocean',
    background: '#001122',
    foreground: '#4fc3f7',
    primary: '#29b6f6',
    secondary: '#0277bd',
    accent: '#81c784',
    muted: '#546e7a',
    success: '#66bb6a',
    warning: '#ffca28',
    error: '#ef5350',
    cursor: '#4fc3f7',
    scrollbar: '#29b6f6',
  },
  {
    name: 'synthwave',
    displayName: 'Synthwave',
    background: '#0f0f23',
    foreground: '#ff79c6',
    primary: '#bd93f9',
    secondary: '#8be9fd',
    accent: '#50fa7b',
    muted: '#6272a4',
    success: '#50fa7b',
    warning: '#f1fa8c',
    error: '#ff5555',
    cursor: '#ff79c6',
    scrollbar: '#bd93f9',
  },
  {
    name: 'monochrome',
    displayName: 'Monochrome',
    background: '#000000',
    foreground: '#ffffff',
    primary: '#ffffff',
    secondary: '#cccccc',
    accent: '#aaaaaa',
    muted: '#666666',
    success: '#ffffff',
    warning: '#cccccc',
    error: '#aaaaaa',
    cursor: '#ffffff',
    scrollbar: '#ffffff',
  },
  {
    name: 'sunset',
    displayName: 'Sunset',
    background: '#1a0f0a',
    foreground: '#ff8c42',
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#ffd23f',
    muted: '#8b4513',
    success: '#32cd32',
    warning: '#ffd700',
    error: '#dc143c',
    cursor: '#ff8c42',
    scrollbar: '#ff6b35',
  },
  {
    name: 'neon',
    displayName: 'Neon',
    background: '#0a0a0a',
    foreground: '#ff006e',
    primary: '#fb5607',
    secondary: '#ffbe0b',
    accent: '#8338ec',
    muted: '#666666',
    success: '#06ffa5',
    warning: '#ffbe0b',
    error: '#ff006e',
    cursor: '#ff006e',
    scrollbar: '#fb5607',
  },
  {
    name: 'cyberpunk',
    displayName: 'Cyberpunk',
    background: '#0d1117',
    foreground: '#00d4ff',
    primary: '#ff0080',
    secondary: '#00ff88',
    accent: '#ffff00',
    muted: '#58a6ff',
    success: '#00ff88',
    warning: '#ffff00',
    error: '#ff0080',
    cursor: '#00d4ff',
    scrollbar: '#ff0080',
  },
  {
    name: 'forest',
    displayName: 'Forest',
    background: '#0b1426',
    foreground: '#7dd3fc',
    primary: '#22c55e',
    secondary: '#16a34a',
    accent: '#84cc16',
    muted: '#64748b',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    cursor: '#7dd3fc',
    scrollbar: '#22c55e',
  }
];

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes[0],
  themes,
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  // Load saved theme from memory on mount
  useEffect(() => {
    const savedTheme = localStorage?.getItem('terminal-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--terminal-bg', currentTheme.background);
    root.style.setProperty('--terminal-fg', currentTheme.foreground);
    root.style.setProperty('--terminal-primary', currentTheme.primary);
    root.style.setProperty('--terminal-secondary', currentTheme.secondary);
    root.style.setProperty('--terminal-accent', currentTheme.accent);
    root.style.setProperty('--terminal-muted', currentTheme.muted);
    root.style.setProperty('--terminal-success', currentTheme.success);
    root.style.setProperty('--terminal-warning', currentTheme.warning);
    root.style.setProperty('--terminal-error', currentTheme.error);
    root.style.setProperty('--terminal-cursor', currentTheme.cursor);
    root.style.setProperty('--terminal-scrollbar', currentTheme.scrollbar);
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      setCurrentTheme(theme);
      // Save to memory (avoiding localStorage in artifacts)
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('terminal-theme', theme.name);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};