import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";
import { RiReactjsLine, RiNodejsLine, RiDatabase2Line, RiToolsLine, RiBookOpenLine, RiStarLine } from "react-icons/ri";
import { useState } from "react";

interface SkillCategory {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    items: string[];
    color: string;
    level?: number;
}

export function SkillsCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const skillCategories: SkillCategory[] = [
        {
            label: "Frontend",
            icon: RiReactjsLine,
            items: ["React & Next.js", "TypeScript & JavaScript (ES6+)", "Tailwind CSS & Styled Components", "Electron & Progressive Web Apps"],
            color: theme.primary,
            level: 90
        },
        {
            label: "Backend",
            icon: RiNodejsLine,
            items: ["Node.js & Express.js", "PostgreSQL & MongoDB", "REST APIs & GraphQL", "Authentication & Authorization"],
            color: theme.success,
            level: 85
        },
        {
            label: "Tools & DevOps",
            icon: RiToolsLine,
            items: ["Git & GitHub Actions", "Docker & Containerization", "VS Code & Development Tools", "Linux & Command Line"],
            color: theme.warning,
            level: 80
        },
        {
            label: "Currently Learning",
            icon: RiBookOpenLine,
            items: ["Rust & Systems Programming", "Go & Microservices", "C/C++ & Performance Optimization", "Flutter & Dart"],
            color: theme.accent,
            level: 60
        }
    ];

    const SkillMeter = ({ level, color }: { level: number; color: string }) => (
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: color + '20' }}>
            <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                    backgroundColor: color,
                    width: `${level}%`,
                    boxShadow: `0 0 10px ${color}50`
                }}
            />
        </div>
    );

    return (
        <div style={{ color: theme.foreground }} className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <RiStarLine className="text-2xl" style={{ color: theme.success }} />
                <h2 className="text-xl font-bold" style={{ color: theme.success }}>
                    Technical Expertise
                </h2>
                <div className="ml-auto text-sm opacity-70" style={{ color: theme.muted }}>
                    Click categories to expand
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {skillCategories.map(({ label, icon: Icon, items, color, level }) => (
                    <div
                        key={label}
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedCategory === label ? 'scale-105' : 'hover:scale-102'
                            }`}
                        style={{
                            borderColor: selectedCategory === label ? color : color + '30',
                            backgroundColor: selectedCategory === label ? color + '10' : color + '05'
                        }}
                        onClick={() => setSelectedCategory(selectedCategory === label ? null : label)}
                    >
                        {/* Category Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Icon className={`text-xl text-[${color}]`} />
                                <span className="font-semibold" style={{ color }}>{label}</span>
                            </div>
                            {level && (
                                <span className="text-sm font-mono px-2 py-1 rounded"
                                    style={{ backgroundColor: color + '20', color }}>
                                    {level}%
                                </span>
                            )}
                        </div>

                        {/* Skill Level Meter */}
                        {level && <SkillMeter level={level} color={color} />}

                        {/* Skills List */}
                        <div className={`mt-3 space-y-2 transition-all duration-300 overflow-hidden ${selectedCategory === label ? 'max-h-96 opacity-100' : 'max-h-16 opacity-70'
                            }`}>
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="transition-colors duration-200 hover:opacity-80">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: theme.accent + '20' }}>
                <button
                    onClick={() => executeCommand('projects')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-md"
                    style={{
                        backgroundColor: theme.accent,
                        color: theme.background
                    }}
                >
                    <RiStarLine className="text-sm" />
                    View My Projects
                </button>
                <button
                    onClick={() => executeCommand('contact')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all hover:scale-105"
                    style={{
                        borderColor: theme.primary,
                        color: theme.primary,
                        backgroundColor: 'transparent'
                    }}
                >
                    Get In Touch
                </button>
            </div>
        </div>
    );
}
