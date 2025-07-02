import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";

export function SkillsCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();

    return (
        <div style={{ color: theme.foreground }}>
            <div className="mb-3" style={{ color: theme.success }}>Technical Skills</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                    { label: "Frontend", items: ["React, Next.js, TypeScript, Electron", "Tailwind CSS, HTML5, CSS3", "JavaScript (ES6+)"] },
                    { label: "Backend", items: ["Node.js, Express.js", "PostgreSQL, MongoDB"] },
                    { label: "Tools & Others", items: ["Git, Docker", "VS Code, Linux", "REST APIs"] },
                    { label: "Currently Learning", items: ["Rust, C/C++", "Go, Dart"] }
                ].map(({ label, items }) => (
                    <div key={label}>
                        <div className="mb-2" style={{ color: theme.warning }}>{label}</div>
                        {items.map((item, idx) => (
                            <div key={idx} className="text-sm">{item}</div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => executeCommand('projects')}
                    className="px-3 py-1 rounded text-sm transition-colors hover:opacity-80"
                    style={{
                        backgroundColor: theme.accent,
                        color: theme.background
                    }}
                >
                    View Projects
                </button>
            </div>
        </div>
    );
}
