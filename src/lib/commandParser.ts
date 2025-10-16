import { ParsedCommand } from '@/types/terminal';

export const parseCommand = (input: string): ParsedCommand => {
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