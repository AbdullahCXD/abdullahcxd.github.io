import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";
import { FaDiscord, FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export function ContactCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();

    return (
        <div style={{ color: theme.foreground }}>
            <div className="mb-3" style={{ color: theme.primary }}>Get In Touch</div>
            <div className="mb-4 pl-4" style={{ borderLeft: `2px solid ${theme.primary}` }}>
                <div className="mb-2">I'd love to hear from you! Feel free to reach out:</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span style={{ color: theme.accent }}><MdEmail /></span>
                        <span>contact@abdullahcxd.is-a.dev</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span style={{ color: theme.accent }}><FaDiscord /></span>
                        <span>@sabdullahcxd</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                
            </div>
        </div>
    )
}