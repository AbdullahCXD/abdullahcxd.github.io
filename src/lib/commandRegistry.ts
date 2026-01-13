import { CommandInfo } from '@/types/terminal';

export const commandsInfo: CommandInfo[] = [
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
  },
  {
    name: 'quit',
    description: 'Exit the terminal (alias for clear)',
    category: 'system',
    examples: ['quit']
  }
];