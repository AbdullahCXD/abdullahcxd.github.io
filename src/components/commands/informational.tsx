// InformationalFrame.tsx
import { useTheme } from "@/providers/ThemeProvider";
import { RiTerminalBoxLine, RiCodeSSlashLine, RiGitBranchLine, RiRocketLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { AllCommandContext } from "@/types/context";

function TypewriterText({ text, delay = 50 }: { text: string; delay?: number }) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, delay]);

    return <span>{displayText}</span>;
}

export function InformationalFrame(props: AllCommandContext) {
    const { currentTheme: theme } = useTheme();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const messages = [
        "Hey there! 👋",
        `Welcome to my interactive portfolio, built with Next.JS and Tailwind!`,
        "This terminal interface showcases my work and skills in a unique way.",
        "Try typing \`help\` to explore all available commands and features.",
        "Check out my projects with \`projects\` - there's some cool stuff to see!"
    ];

    return (
        <div
            style={{
                color: theme.foreground,
                borderColor: theme.accent + '40',
                backgroundColor: theme.accent + '05'
            }}
            className="flex flex-col p-4 border rounded-xl backdrop-blur-sm transition-all duration-500 hover:shadow-lg"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b" style={{ borderColor: theme.accent + '20' }}>
                <RiTerminalBoxLine className="text-xl" style={{ color: theme.accent }} />
                <span className="font-bold" style={{ color: theme.success }}>
                    System Information
                </span>
                <div className="ml-auto flex gap-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.success }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse delay-150" style={{ backgroundColor: theme.warning }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse delay-300" style={{ backgroundColor: theme.error }}></div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                {showContent && messages.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                        <span
                            className="text-sm font-mono px-2 py-1 rounded flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                            style={{
                                backgroundColor: theme.primary + '20',
                                color: theme.primary
                            }}
                        >
                            user@portfolio
                        </span>
                        <span className="flex-1" style={{ color: theme.warning }}>
                            <TypewriterText
                                text={line}
                                delay={30}
                            />
                        </span>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ borderColor: theme.accent + '20' }}>
                {[
                    { icon: RiCodeSSlashLine, label: "Commands", value: "8+" },
                    { icon: RiGitBranchLine, label: "Projects", value: "3+" },
                    { icon: RiRocketLine, label: "Experience", value: "3+ yrs" },
                    { icon: RiTerminalBoxLine, label: "Uptime", value: "24/7" }
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center group cursor-default">
                        <Icon className="text-lg mx-auto mb-1 group-hover:scale-110 transition-transform"
                            style={{ color: theme.accent }} />
                        <div className="text-xs font-bold" style={{ color: theme.foreground }}>{value}</div>
                        <div className="text-xs opacity-70" style={{ color: theme.muted }}>{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}