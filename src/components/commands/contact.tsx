"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";
import { FaDiscord, FaMessage, FaCopy } from "react-icons/fa6";
import { MdEmail, MdCheck } from "react-icons/md";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// Enhanced Contact Command with copy functionality and better animations
export function ContactCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("contact@abdullahcxd.is-a.dev");
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch (err) {
            console.error("Failed to copy email:", err);
        }
    };

    return (
        <div 
            className="p-6 rounded-lg border transition-all duration-300 hover:shadow-lg animate-fadeIn"
            style={{ 
                backgroundColor: theme.background,
                borderColor: theme.primary + '40',
                boxShadow: `0 4px 20px ${theme.primary}20`
            }}
        >
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-6">
                <div 
                    className="p-2 rounded-full"
                    style={{ backgroundColor: theme.primary + '20' }}
                >
                    <FaMessage 
                        className="text-xl"
                        style={{ color: theme.primary }}
                    />
                </div>
                <h2 
                    className="text-2xl font-bold"
                    style={{ color: theme.primary }}
                >
                    Get In Touch
                </h2>
            </div>

            {/* Description */}
            <p 
                className="mb-6 text-lg leading-relaxed"
                style={{ color: theme.primary }}
            >
                Love to talk and hear from you, here is my contacts so you could talk to me either for help, chatting or games!
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
                {/* Email */}
                <div 
                    className="flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                    style={{ 
                        backgroundColor: theme.secondary + '20',
                        borderColor: theme.secondary + '40'
                    }}
                    onClick={handleCopyEmail}
                >
                    <div className="flex items-center gap-3">
                        <MdEmail 
                            className="text-xl group-hover:scale-110 transition-transform"
                            style={{ color: theme.secondary }}
                        />
                        <div>
                            <div 
                                className="font-medium"
                                style={{ color: theme.primary }}
                            >
                                Email
                            </div>
                            <div 
                                className="text-sm opacity-80"
                                style={{ color: theme.primary }}
                            >
                                contact@abdullahcxd.is-a.dev
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {copiedEmail ? (
                            <>
                                <MdCheck 
                                    className="text-green-500 animate-bounce"
                                />
                                <span 
                                    className="text-sm text-green-500 font-medium"
                                >
                                    Copied!
                                </span>
                            </>
                        ) : (
                            <FaCopy 
                                className="opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ color: theme.primary }}
                            />
                        )}
                    </div>
                </div>

                {/* Discord */}
                <a
                    href="https://discord.com/users/sabdullahcxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] group"
                    style={{ 
                        backgroundColor: theme.accent + '20',
                        borderColor: theme.accent + '40'
                    }}
                >
                    <div className="flex items-center gap-3">
                        <FaDiscord 
                            className="text-xl group-hover:scale-110 transition-transform"
                            style={{ color: theme.accent }}
                        />
                        <div>
                            <div 
                                className="font-medium"
                                style={{ color: theme.primary }}
                            >
                                Discord
                            </div>
                            <div 
                                className="text-sm opacity-80"
                                style={{ color: theme.primary }}
                            >
                                @sabdullahcxd
                            </div>
                        </div>
                    </div>
                    <FaExternalLinkAlt 
                        className="opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ color: theme.primary }}
                    />
                </a>
            </div>

            {/* Call to action */}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: theme.primary + '20' }}>
                <p 
                    className="text-sm opacity-80 text-center"
                    style={{ color: theme.primary }}
                >
                    Usually respond within 24 hours • Always open to interesting opportunities
                </p>
            </div>
        </div>
    );
}



