import { ReactNode } from 'react';

export interface HistoryElement {
  type: string;
  content: ReactNode;
}

export interface CommandContext {
  executeCommand: (cmd: string) => void;
}

export interface CommandInfo {
  name: string;
  description: string;
  category: string;
  args?: ArgumentInfo[];
  examples?: string[];
}

export interface ArgumentInfo {
  name: string;
  description: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'option';
  options?: string[];
  default?: any;
}

export interface ParsedCommand {
  command: string;
  args: Record<string, any>;
  flags: Record<string, boolean>;
  rawArgs: string[];
}

export interface Theme {
  background: string;
  foreground: string;
  primary: string;
  secondary?: string;
  accent?: string;
  success?: string;
  warning?: string;
  error: string;
  muted: string;
  cursor: string;
  scrollbar: string;
  displayName: string;
}