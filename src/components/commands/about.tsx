import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";
import { MessageCircle, Rocket, ToolCase } from "lucide-react";
import { FcStatistics } from "react-icons/fc";

// Enhanced About Command with better layout and animations
export function AboutCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();

    const skills = ["React", "TypeScript", "Node.js", "Python"];
    const interests = ["Open Source", "My beloved React.js"];

    return (
        <div 
            className="p-6 rounded-lg border transition-all duration-300 hover:shadow-lg animate-fadeIn"
            style={{ 
                backgroundColor: theme.background,
                borderColor: theme.primary + '40',
                boxShadow: `0 4px 20px ${theme.primary}20`
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ 
                        backgroundColor: theme.primary,
                        color: theme.background
                    }}
                >
                    A
                </div>
                <div>
                    <h2 
                        className="text-2xl font-bold"
                        style={{ color: theme.primary }}
                    >
                        About Me
                    </h2>
                    <p 
                        className="text-sm opacity-80"
                        style={{ color: theme.primary }}
                    >
                        Full-Stack Developer & Problem Solver
                    </p>
                </div>
            </div>

            {/* Main content */}
            <div className="space-y-6">
                <div>
                    <p 
                        className="text-lg leading-relaxed mb-4"
                        style={{ color: theme.primary }}
                    >
                        Hey there! I'm Abdullah, also known as AbdullahCXD. I'm a passionate Full-Stack developer that does either pretty-cool or pretty-bad frontend and backend work. In terms I may suck writing code at some point depending on the situation.
                    </p>
                    
                    <p 
                        className="leading-relaxed"
                        style={{ color: theme.primary }}
                    >
                        One thing about me is that I like to make unreadable code, whether it's single letter variables, methods or classes or it's rather that some files are formatted and the others arent. I still make the code work somehow and if it works it works.
                    </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: theme.secondary + '20' }}
                    >
                        <h3 
                            className="font-semibold mb-2 flex items-center gap-2"
                            style={{ color: theme.secondary }}
                        >
                            <span><ToolCase className="size-4" /></span> Main Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={skill}
                                    className="text-xs px-2 py-1 rounded-full transition-all duration-200 hover:scale-105"
                                    style={{
                                        backgroundColor: theme.primary + '30',
                                        color: theme.primary,
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: theme.accent + '20' }}
                    >
                        <h3 
                            className="font-semibold mb-2 flex items-center gap-2"
                            style={{ color: theme.accent }}
                        >
                            <span><Rocket className="size-4" /></span> Current Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest, index) => (
                                <span
                                    key={interest}
                                    className="text-xs px-2 py-1 rounded-full transition-all duration-200 hover:scale-105"
                                    style={{
                                        backgroundColor: theme.accent + '30',
                                        color: theme.primary,
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t" style={{ borderColor: theme.primary + '20' }}>
                <button
                    onClick={() => executeCommand('skills')}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                    style={{
                        backgroundColor: theme.secondary,
                        color: theme.background
                    }}
                >
                    <span><FcStatistics /></span> View Skills
                </button>
                <button
                    onClick={() => executeCommand('projects')}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                    style={{
                        backgroundColor: theme.accent,
                        color: theme.background
                    }}
                >
                    <span><Rocket className="size-4" /></span> See Projects
                </button>
                <button
                    onClick={() => executeCommand('contact')}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 border-2 flex items-center gap-2"
                    style={{
                        borderColor: theme.primary,
                        color: theme.primary,
                        backgroundColor: 'transparent'
                    }}
                >
                    <span><MessageCircle className="size-4" /></span> Get in Touch
                </button>
            </div>
        </div>
    );
}