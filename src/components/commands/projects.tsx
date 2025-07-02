import { createRedirect } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";

export function ProjectsCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();

    return (
        <div style={{ color: theme.foreground }}>
            <div className="mb-3" style={{ color: theme.success }}>Featured Projects</div>
            <div className="space-y-4 mb-4">
                {[
                    {
                        title: "Modkit",
                        tech: "Vite, Electron, TypeScript",
                        desc: "Elegant, modern and fast code editor written in TypeScript using Vite and Electorn",
                        borderColor: theme.primary,
                        buttons: {
                            button1: {
                                text: "🔗 Live Demo",
                                href: "https://github.com/ModKittenDev"
                            },
                            button2: {
                                text: "📖 Source Code",
                                href: "https://github.com/ModKittenDev/modkit"
                            }
                        }
                    },
                    {
                        title: "Zeo Language",
                        tech: "Java, JVM",
                        desc: "Cool and easy to use JVM language that transpiles to Java and runs on the JVM (Java Virtual Machine)",
                        borderColor: theme.accent,
                        buttons: {
                            button1: {
                                text: "🔗 Live Demo",
                                href: "https://github.com/zeolang/zeo"
                            },
                            button2: {
                                text: "📖 Source Code",
                                href: "https://github.com/zeolang/zeo"
                            }
                        }
                    },
                    {
                        title: "Moony Bot",
                        tech: "TypeScript, Discord.js",
                        desc: "Comprehensive and extensive Discord bot that contains many multipurpose features to make your guild feel more fun and secure",
                        borderColor: theme.secondary,
                        buttons: {
                            button1: {
                                text: "🔗 Live Demo",
                                href: "https://moonybot.xyz"
                            },
                            button2: {
                                text: "📖 Source Code",
                                href: "https://moonybot.xyz"
                            }
                        }
                    }
                ].map(({ title, tech, desc, borderColor, buttons }) => (
                    <div key={title} style={{ borderLeft: `2px solid ${borderColor}` }} className="pl-4">
                        <div style={{ color: theme.warning }} className="font-semibold">{title}</div>
                        <div className="text-sm mb-2" style={{ color: theme.muted }}>{tech}</div>
                        <div className="text-sm mb-2">{desc}</div>
                        <div className="flex gap-2">
                            <button
                                style={{
                                    backgroundColor: theme.muted,
                                    color: theme.background
                                }}
                                className="px-2 py-1 rounded text-xs transition-colors hover:opacity-80"
                                onClick={createRedirect(buttons.button1.href)}
                            >
                                {buttons.button1.text}
                            </button>
                            <button
                                style={{
                                    backgroundColor: theme.muted,
                                    color: theme.background
                                }}
                                className="px-2 py-1 rounded text-xs transition-colors hover:opacity-80"
                                onClick={createRedirect(buttons.button2.href)}
                            >
                                {buttons.button2.text}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => executeCommand('contact')}
                    className="px-3 py-1 rounded text-sm transition-colors hover:opacity-80"
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.background
                    }}
                >
                    Get in Touch
                </button>
            </div>
        </div>
    );
}
