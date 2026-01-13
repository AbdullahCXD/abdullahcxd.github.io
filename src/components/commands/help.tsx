// HelpCommand.tsx
import { useTheme } from "@/providers/ThemeProvider";
import { RiInformationLine, RiUserLine, RiCodeSSlashLine, RiFolderLine, RiMailLine, RiPaletteLine, RiDeleteBin6Line, RiQuestionLine, RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react";
import { AllCommandContext } from "@/types/context";

interface Command {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    category: 'info' | 'personal' | 'professional' | 'system';
    usage?: string;
    examples?: string[];
}

export function HelpCommand(props: AllCommandContext) {
    const { currentTheme: theme } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const commands: Command[] = [
        {
            name: "info",
            description: "Display system information and project details",
            icon: RiInformationLine,
            category: "info",
            usage: "info [--verbose]",
            examples: ["info - Shows system information", "info --verbose - Shows detailed system info"]
        },
        {
            name: "about",
            description: "Learn about my background, experience, and journey",
            icon: RiUserLine,
            category: "personal",
            usage: "about",
            examples: ["about - Displays personal information and career background"]
        },
        {
            name: "skills",
            description: "Explore my technical skills and expertise levels",
            icon: RiCodeSSlashLine,
            category: "professional",
            usage: "skills",
            examples: ["skills - Shows categorized technical skills with proficiency levels"]
        },
        {
            name: "projects",
            description: "Browse through my portfolio of projects and work",
            icon: RiFolderLine,
            category: "professional",
            usage: "projects [options]",
            examples: ["projects - Lists all projects", "projects --filter react - Filter by tech"]
        },
        {
            name: "contact",
            description: "Get my contact information and social links",
            icon: RiMailLine,
            category: "personal",
            usage: "contact",
            examples: ["contact - Shows email, social media, and professional links"]
        },
        {
            name: "theme",
            description: "Customize terminal appearance and color scheme",
            icon: RiPaletteLine,
            category: "system",
            usage: "theme [--name theme] [--list]",
            examples: ["theme --list - Shows available themes", "theme --name matrix - Switch theme"]
        },
        {
            name: "clear",
            description: "Clear the terminal screen and command history",
            icon: RiDeleteBin6Line,
            category: "system",
            usage: "clear",
            examples: ["clear - Clears all terminal output"]
        },
        {
            name: "echo",
            description: "Display text to the terminal with optional colors",
            icon: RiCodeSSlashLine,
            category: "system",
            usage: "echo \"text\" [--color colorname]",
            examples: ["echo \"Hello\" - Displays text", "echo \"Hello\" --color green - Colored output"]
        }
    ];

    const categories = {
        info: { label: "Information", color: theme.accent },
        personal: { label: "Personal", color: theme.success },
        professional: { label: "Professional", color: theme.primary },
        system: { label: "System", color: theme.warning }
    };

    const filteredCommands = selectedCategory
        ? commands.filter(cmd => cmd.category === selectedCategory)
        : commands;

    return (
        <div style={{ color: theme.foreground }} className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <RiQuestionLine className="text-2xl" style={{ color: theme.success }} />
                <h2 className="text-xl font-bold" style={{ color: theme.success }}>
                    Available Commands
                </h2>
                <div className="ml-auto text-sm" style={{ color: theme.muted }}>
                    {commands.length} commands available
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!selectedCategory ? 'scale-105' : 'hover:scale-105'
                        }`}
                    style={{
                        backgroundColor: !selectedCategory ? theme.primary : theme.primary + '20',
                        color: !selectedCategory ? theme.background : theme.primary
                    }}
                >
                    All Commands
                </button>
                {Object.entries(categories).map(([key, { label, color }]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === key ? 'scale-105' : 'hover:scale-105'
                            }`}
                        style={{
                            backgroundColor: selectedCategory === key ? color : color + '20',
                            color: selectedCategory === key ? theme.background : color
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Commands List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommands.map((cmd) => (
                    <div
                        key={cmd.name}
                        className="border rounded-xl p-4 transition-all duration-300 hover:scale-102 hover:shadow-lg group"
                        style={{
                            borderColor: categories[cmd.category].color + '30',
                            backgroundColor: categories[cmd.category].color + '05'
                        }}
                    >
                        {/* Command Header */}
                        <div className="flex items-start gap-3 mb-3">
                            <cmd.icon
                                className={`text-xl mt-0.5 group-hover:scale-110 transition-transform text-${categories[cmd.category].color}`}
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-lg" style={{ color: categories[cmd.category].color }}>
                                        {cmd.name}
                                    </span>
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                                        style={{
                                            backgroundColor: categories[cmd.category].color + '20',
                                            color: categories[cmd.category].color
                                        }}
                                    >
                                        {categories[cmd.category].label}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                                    {cmd.description}
                                </p>
                            </div>
                        </div>

                        {/* Usage and Examples */}
                        {cmd.usage && (
                            <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: categories[cmd.category].color + '20' }}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold" style={{ color: theme.warning }}>
                                        USAGE:
                                    </span>
                                    <code
                                        className="text-xs px-2 py-1 rounded font-mono"
                                        style={{
                                            backgroundColor: theme.primary + '20',
                                            color: theme.primary
                                        }}
                                    >
                                        {cmd.usage}
                                    </code>
                                </div>
                                {cmd.examples && cmd.examples.length > 0 && (
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold" style={{ color: theme.success }}>
                                            EXAMPLES:
                                        </span>
                                        {cmd.examples.map((example, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs">
                                                <RiArrowRightSLine className="opacity-50" />
                                                <span className="opacity-80">{example}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Tips */}
            <div
                className="mt-6 p-4 rounded-xl border"
                style={{
                    borderColor: theme.accent + '30',
                    backgroundColor: theme.accent + '05'
                }}
            >
                <div className="text-sm space-y-3">
                    <div className="font-semibold mb-2" style={{ color: theme.accent }}>
                        ⌨️ Keyboard Shortcuts:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 rounded" style={{backgroundColor: theme.primary + '20', color: theme.primary}}>↑ ↓</code>
                            <span>Navigate suggestions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 rounded" style={{backgroundColor: theme.primary + '20', color: theme.primary}}>Tab</code>
                            <span>Complete command</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 rounded" style={{backgroundColor: theme.primary + '20', color: theme.primary}}>Enter</code>
                            <span>Execute command</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 rounded" style={{backgroundColor: theme.primary + '20', color: theme.primary}}>Esc</code>
                            <span>Close suggestions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 rounded" style={{backgroundColor: theme.primary + '20', color: theme.primary}}>Ctrl+A</code>
                            <span>Focus input field</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 rounded" style={{backgroundColor: theme.primary + '20', color: theme.primary}}>Click</code>
                            <span>Focus terminal</span>
                        </div>
                    </div>
                </div>
                
                <div className="text-sm space-y-2 mt-4 pt-4 border-t" style={{ borderColor: theme.accent + '20' }}>
                    <div className="font-semibold" style={{ color: theme.accent }}>
                        💡 Pro Tips:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>• Type partial command names for autocomplete</div>
                        <div>• Use --help flag for command details</div>
                        <div>• Suggestions update as you type</div>
                        <div>• Terminal stays responsive and fast</div>
                    </div>
                </div>
            </div>
        </div>
    );
}