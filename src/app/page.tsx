'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { Terminal } from '@/components/terminal/Terminal';

export default function TerminalPortfolio() {
  return (
    <ThemeProvider>
      <Terminal />
    </ThemeProvider>
  );
}