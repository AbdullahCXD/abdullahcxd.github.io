"use client";
import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";
import { Hand, MessageCircle, Rocket, ToolCase } from "lucide-react";
import React from "react";

// Enhanced Welcome Message with typewriter effect and better animations
export function WelcomeMessage({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();
    const [typedText, setTypedText] = React.useState("");
    const [showCursor, setShowCursor] = React.useState(true);

    const fullText = "Heyo User! Welcome to the terminal!";

    // Typewriter effect (simplified for this example)
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTypedText(fullText);
        }, 100);
        
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearTimeout(timer);
            clearInterval(cursorTimer);
        };
    }, []);

    const commandButtons = [
        { cmd: 'about', icon: Hand, desc: 'Learn about me' },
        { cmd: 'skills', icon: ToolCase, desc: 'Technical skills' },
        { cmd: 'projects', icon: Rocket, desc: 'My projects' },
        { cmd: 'contact', icon: MessageCircle, desc: 'Get in touch' },
    ];

    return (
        <div 
            className="p-8 rounded-lg border-2 border-dashed transition-all duration-500 animate-fadeIn"
            style={{ 
                backgroundColor: theme.background + 'f0',
                borderColor: theme.primary + '60'
            }}
        >
            {/* Animated header */}
            <div className="text-center mb-8">
                <h1 
                    className="text-3xl md:text-4xl font-bold mb-2 font-mono"
                    style={{ color: theme.primary }}
                >
                    {typedText}
                    {showCursor && <span className="animate-pulse">|</span>}
                </h1>
                
                <div 
                    className="text-lg mb-4 animate-slideUp"
                    style={{ 
                        color: theme.secondary,
                        animationDelay: '1s'
                    }}
                >
                    You thought this was a real terminal? It's a portfolio.
                </div>
                
                <p 
                    className="text-base opacity-80 animate-slideUp"
                    style={{ 
                        color: theme.primary,
                        animationDelay: '1.5s'
                    }}
                >
                    Type 'help' to see available commands or explore the interactive buttons below:
                </p>
            </div>

            {/* Enhanced command buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {commandButtons.map(({ cmd, icon: Icon, desc }, index) => (
                    <button
                        key={cmd}
                        onClick={() => executeCommand(cmd)}
                        className="group p-4 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-xl border-2"
                        style={{
                            backgroundColor: theme.primary + '10',
                            borderColor: theme.primary + '30',
                            animationDelay: `${2 + index * 0.2}s`
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                                <Icon className="size-4" />
                            </span>
                            <span 
                                className="font-bold text-lg capitalize group-hover:text-opacity-90"
                                style={{ color: theme.primary }}
                            >
                                {cmd}
                            </span>
                        </div>
                        <p 
                            className="text-sm opacity-80 group-hover:opacity-100"
                            style={{ color: theme.primary }}
                        >
                            {desc}
                        </p>
                    </button>
                ))}
            </div>

            {/* Terminal hint */}
            <div 
                className="mt-8 text-center animate-fadeIn"
                style={{ animationDelay: '3s' }}
            >
                <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                    style={{ 
                        backgroundColor: theme.accent + '20',
                        color: theme.accent
                    }}
                >
                    <span>💡</span>
                    <span>Pro tip: Try typing commands like a real terminal!</span>
                </div>
            </div>
        </div>
    );
}