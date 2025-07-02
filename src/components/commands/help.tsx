import { useTheme } from "@/providers/ThemeProvider";

export function HelpCommand() {
    const { currentTheme: theme } = useTheme();

    return (
        <div style={{ color: theme.foreground }}>
            <div className="mb-2" style={{ color: theme.success }}>Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                    ["info", "Displays information about this project"],
                    ["about", "Learn about me"],
                    ["skills", "View my technical skills"],
                    ["projects", "See my projects"],
                    ["contact", "Get in touch"],
                    ["theme", "Change terminal theme"],
                    ["clear", "Clear terminal"],
                ].map(([cmd, desc]) => (
                    <div key={cmd}>
                        <span style={{ color: theme.warning }}>{cmd}</span> - {desc}
                    </div>
                ))}
            </div>
        </div>
    );
}
