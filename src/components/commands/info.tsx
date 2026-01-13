import { AllCommandContext } from "@/types/context";
import { useTheme } from "@/providers/ThemeProvider";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FiMonitor, FiGitBranch, FiCode } from "react-icons/fi";

export function InfoCommand({ args }: AllCommandContext) {
    const { currentTheme: theme } = useTheme();
    const verbose = args?.verbose === true || args?.verbose === 'true';
    
    // Get browser and system info
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    const isWindows = userAgent.includes('Windows');
    const isLinux = userAgent.includes('Linux');
    const isMac = userAgent.includes('Mac');
    const platform = isWindows ? 'Windows' : isLinux ? 'Linux' : isMac ? 'macOS' : 'Unknown';
    
    const isBrowser = typeof window !== 'undefined';
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
    
    return (
        <div 
            className="p-4 rounded-lg border"
            style={{
                borderColor: theme.accent + '40',
                backgroundColor: theme.accent + '05'
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: theme.accent + '20' }}>
                <HiOutlineInformationCircle style={{ color: theme.primary }} className="text-xl" />
                <span className="font-bold" style={{ color: theme.primary }}>System Information</span>
            </div>
            
            {/* Basic Info */}
            <div className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="opacity-70" style={{ color: theme.muted }}>Platform:</span>
                        <span className="ml-2 font-mono" style={{ color: theme.foreground }}>{platform}</span>
                    </div>
                    <div>
                        <span className="opacity-70" style={{ color: theme.muted }}>Browser:</span>
                        <span className="ml-2 font-mono" style={{ color: theme.foreground }}>
                            {userAgent.includes('Firefox') ? 'Firefox' :
                             userAgent.includes('Chrome') ? 'Chrome' :
                             userAgent.includes('Safari') ? 'Safari' :
                             userAgent.includes('Edge') ? 'Edge' : 'Unknown'}
                        </span>
                    </div>
                    {verbose && (
                        <>
                            <div>
                                <span className="opacity-70" style={{ color: theme.muted }}>Resolution:</span>
                                <span className="ml-2 font-mono" style={{ color: theme.foreground }}>{screenWidth}x{screenHeight}</span>
                            </div>
                            <div>
                                <span className="opacity-70" style={{ color: theme.muted }}>Environment:</span>
                                <span className="ml-2 font-mono" style={{ color: theme.foreground }}>Browser (Client-side)</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            {/* Tech Stack */}
            <div className="mt-4 pt-3 border-t" style={{ borderColor: theme.accent + '20' }}>
                <div className="text-sm font-semibold mb-2" style={{ color: theme.secondary }}>
                    <FiCode className="inline mr-2" />
                    Technology Stack
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono" style={{ color: theme.foreground }}>
                        <span style={{ color: theme.success }}>$</span> Framework: Next.js 15
                    </div>
                    <div className="font-mono" style={{ color: theme.foreground }}>
                        <span style={{ color: theme.success }}>$</span> Runtime: Node.js
                    </div>
                    <div className="font-mono" style={{ color: theme.foreground }}>
                        <span style={{ color: theme.success }}>$</span> Styling: Tailwind CSS
                    </div>
                    <div className="font-mono" style={{ color: theme.foreground }}>
                        <span style={{ color: theme.success }}>$</span> Language: TypeScript
                    </div>
                </div>
            </div>
            
            {verbose && (
                <>
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: theme.accent + '20' }}>
                        <div className="text-sm font-semibold mb-2" style={{ color: theme.warning }}>
                            <FiGitBranch className="inline mr-2" />
                            Version Info
                        </div>
                        <div className="space-y-1 text-sm font-mono" style={{ color: theme.foreground }}>
                            <div><span style={{ color: theme.success }}>$</span> Portfolio Version: 1.0.0</div>
                            <div><span style={{ color: theme.success }}>$</span> Last Updated: 2024</div>
                            <div><span style={{ color: theme.success }}>$</span> Status: <span style={{ color: theme.success }}>Online</span></div>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: theme.accent + '20' }}>
                        <div className="text-sm font-semibold mb-2" style={{ color: theme.primary }}>
                            <FiMonitor className="inline mr-2" />
                            Advanced Info
                        </div>
                        <div className="space-y-1 text-xs font-mono" style={{ color: theme.muted }}>
                            <div>User Agent: {userAgent.substring(0, 80)}...</div>
                            <div>JavaScript: Enabled</div>
                            <div>Local Storage: Available</div>
                            <div>Session Storage: Available</div>
                        </div>
                    </div>
                </>
            )}
            
            {!verbose && (
                <div className="mt-3 text-xs" style={{ color: theme.muted }}>
                    <span style={{ color: theme.accent }}>→</span> Use <span className="font-mono">info --verbose</span> for more details
                </div>
            )}
        </div>
    );
}
