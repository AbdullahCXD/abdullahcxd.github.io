import { HistoryElement } from '@/types/terminal';
import { Theme } from '@/types/terminal';

interface TerminalHistoryProps {
  history: HistoryElement[];
  theme: Theme;
}

export function TerminalHistory({ history, theme }: TerminalHistoryProps) {
  return (
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div key={index}>
          {entry.type === 'input' && (
            <div className="flex items-center gap-2">
              <span style={{ color: theme.primary }}>❯</span>
              <span style={{ color: theme.foreground }}>{entry.content}</span>
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
  );
}