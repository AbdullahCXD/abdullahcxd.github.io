import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";

export function WelcomeMessage({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();

    return (
        <div className="space-y-1" style={{ color: theme.success }}>
            <div className="text-xl mb-2">Heyo User! Welcome to the terminal!</div>
            <div style={{ color: theme.muted }} className="text-sm">You thought this was a real terminal? It's a portfolio.</div>
            <div className="mb-4" style={{ color: theme.foreground }}>
                Type 'help' to see available commands or explore below:
            </div>
            <div className="flex flex-wrap gap-2">
                {[
                    { cmd: 'about', bg: theme.primary },
                    { cmd: 'skills', bg: theme.accent },
                    { cmd: 'projects', bg: theme.warning },
                    { cmd: 'contact', bg: theme.success },
                ].map(({ cmd, bg }) => (
                    <button
                        key={cmd}
                        onClick={() => executeCommand(cmd)}
                        className="px-3 py-1 rounded text-sm transition-colors hover:opacity-80"
                        style={{ backgroundColor: bg, color: theme.background }}
                    >
                        {cmd}
                    </button>
                ))}
            </div>
        </div>
    );
}
