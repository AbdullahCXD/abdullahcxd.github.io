import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";

export function AboutCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();

    return (
        <div style={{ color: theme.foreground }}>
            <div className="mb-3" style={{ color: theme.primary }}>About Me</div>
            <div className="mb-4">
                <p className="mb-2">
                    Hey there! I'm a passionate full-stack developer with a love for creating
                    innovative web applications and solving complex problems.
                </p>
                <p className="mb-2">
                    I enjoy working with modern technologies and constantly learning new things.
                    When I'm not coding, you can find me exploring new tech trends or contributing
                    to open-source projects.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => executeCommand('skills')}
                    className="px-3 py-1 rounded text-sm transition-colors hover:opacity-80"
                    style={{ 
                        backgroundColor: theme.secondary, 
                        color: theme.background 
                    }}
                >
                    View Skills
                </button>
                <button
                    onClick={() => executeCommand('projects')}
                    className="px-3 py-1 rounded text-sm transition-colors hover:opacity-80"
                    style={{ 
                        backgroundColor: theme.accent, 
                        color: theme.background 
                    }}
                >
                    See Projects
                </button>
            </div>
        </div>
    )
}