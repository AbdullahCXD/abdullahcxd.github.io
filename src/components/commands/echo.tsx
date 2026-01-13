import { AllCommandContext } from "@/types/context";
import { useTheme } from "@/providers/ThemeProvider";

export function EchoCommand({ args }: AllCommandContext) {
    const { currentTheme: theme } = useTheme();
    
    // Get text from args or rawArgs
    const text = args?.text || '';
    const color = args?.color as string | undefined;
    
    const colorMap: Record<string, string> = {
        red: '#ff6b6b',
        green: '#51cf66',
        blue: '#339af0',
        yellow: '#ffd43b',
        cyan: '#22d3ee',
        magenta: '#e879f9'
    };
    
    const textColor = color && colorMap[color.toLowerCase()] ? colorMap[color.toLowerCase()] : theme.foreground;
    
    return (
        <div 
            style={{ color: textColor }}
            className="font-mono"
        >
            {text}
        </div>
    );
}
