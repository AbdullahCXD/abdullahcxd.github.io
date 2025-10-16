"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { AllCommandContext } from "@/types/context";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export interface ProjectButton {
    text: string;
    href: string;
    primary: boolean
}

export interface Project {
    id: string;
    title: string;
    tech: string[];
    desc: string;
    status: `Production Ready` | `Active` | `In Progress` | `Undeveloped`;
    category: `Desktop Application` | `Web Application` | `Bot` | `Programming Language`;
    gradient: string;
    borderColor: string;
    buttons: {
        live: ProjectButton;
        source: ProjectButton;
    }
}

export function LiveDemoButton(href: string, primary: boolean) {
    return {
        text: "🔗 Live Demo",
        href,
        primary
    } as ProjectButton;
}

export function SourceCodeButton(href: string, primary: boolean) {
    return {
        text: "📖 Source Code",
        href,
        primary
    } as ProjectButton;
}

export function ProjectsCommand({ ctx }: AllCommandContext) {
    const { executeCommand } = ctx;
    const { currentTheme: theme } = useTheme();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const projects: Project[] = [
        {
            id: 'adiof-pentesting',
            title: "Minecraft Adiof",
            tech: [`TypeScript`, `Node.js`],
            desc: `A pentesting tool used to debug and test locally hosted minecraft servers`,
            status: "In Progress",
            category: `Desktop Application`,
            gradient: `linear-gradient(135deg, ${theme.primary}20, ${theme.primary}05)`,
            borderColor: theme.primary,
            buttons: {
                live: LiveDemoButton("https://github.com/AbdullahCXD/adiof-pentesting", true),
                source: SourceCodeButton("https://github.com/AbdullahCXD/adiof-pentesting", false)
            }
        }
    ];

    const handleRedirect = (url: string) => {
        return () => {
            window.open(url, '_blank', 'noopener,noreferrer');
        };
    };

    return (
        <div 
            className="p-6 rounded-lg border transition-all duration-300 hover:shadow-lg animate-fadeIn"
            style={{ 
                backgroundColor: theme.background,
                borderColor: theme.primary + '40',
                boxShadow: `0 4px 20px ${theme.primary}20`,
                color: theme.primary
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div 
                    className="p-2 rounded-full"
                    style={{ backgroundColor: theme.primary + '20' }}
                >
                    <span className="text-xl">🚀</span>
                </div>
                <div>
                    <h2 
                        className="text-2xl font-bold"
                        style={{ color: theme.primary }}
                    >
                        Featured Projects
                    </h2>
                    <p 
                        className="text-sm opacity-80"
                        style={{ color: theme.primary }}
                    >
                        A showcase of my recent projects and contributions
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="space-y-6 mb-8">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="group relative rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden"
                        style={{
                            background: project.gradient,
                            borderColor: hoveredProject === project.id ? project.borderColor : project.borderColor + '40',
                            animationDelay: `${index * 150}ms`
                        }}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {/* Project Content */}
                        <div className="p-6">
                            {/* Project Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 
                                            className="text-xl font-bold group-hover:text-opacity-90 transition-all"
                                            style={{ color: project.borderColor }}
                                        >
                                            {project.title}
                                        </h3>
                                        <span 
                                            className="text-xs px-2 py-1 rounded-full font-medium"
                                            style={{ 
                                                backgroundColor: project.borderColor + '20',
                                                color: project.borderColor
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                    </div>
                                    <div 
                                        className="text-sm mb-3 opacity-80"
                                        style={{ color: theme.primary }}
                                    >
                                        {project.status}
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech, techIndex) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105"
                                        style={{
                                            backgroundColor: theme.primary + '15',
                                            color: theme.primary,
                                            animationDelay: `${(index * 150) + (techIndex * 50)}ms`
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <p 
                                className="text-sm leading-relaxed mb-6 opacity-90"
                                style={{ color: theme.primary }}
                            >
                                {project.desc}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleRedirect(project.buttons.live.href)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: project.borderColor,
                                        color: theme.background
                                    }}
                                >
                                    {project.buttons.live.text}
                                    <FaExternalLinkAlt className="text-xs" />
                                </button>
                                <button
                                    onClick={handleRedirect(project.buttons.source.href)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:scale-105"
                                    style={{
                                        borderColor: project.borderColor,
                                        color: project.borderColor,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {project.buttons.source.text}
                                    <FaExternalLinkAlt className="text-xs" />
                                </button>
                            </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: `linear-gradient(135deg, ${project.borderColor}05, transparent)`
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Call to Action Section */}
            <div 
                className="pt-6 border-t"
                style={{ borderColor: theme.primary + '20' }}
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 
                            className="font-semibold mb-1"
                            style={{ color: theme.primary }}
                        >
                            Interested in working together?
                        </h3>
                        <p 
                            className="text-sm opacity-80"
                            style={{ color: theme.primary }}
                        >
                            I'm always open to discussing new opportunities and interesting projects.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => executeCommand('contact')}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                            style={{
                                borderColor: theme.primary,
                                color: theme.primary,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <span>💬</span>
                            Get In Touch
                        </button>
                        <button
                            onClick={() => executeCommand('about')}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                                backgroundColor: theme.primary + '20',
                                color: theme.primary
                            }}
                        >
                            <span>👋</span>
                            About Me
                        </button>
                    </div>
                </div>
            </div>

            {/* Project Stats */}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: theme.primary + '10' }}>
                <div className="flex justify-center gap-8 text-center">
                    <div>
                        <div 
                            className="text-2xl font-bold"
                            style={{ color: theme.primary }}
                        >
                            {projects.length}
                        </div>
                        <div 
                            className="text-xs opacity-80"
                            style={{ color: theme.primary }}
                        >
                            Featured Projects
                        </div>
                    </div>
                    <div>
                        <div 
                            className="text-2xl font-bold"
                            style={{ color: theme.secondary }}
                        >
                            {projects.filter(p => p.status === "Production Ready").length}
                        </div>
                        <div 
                            className="text-xs opacity-80"
                            style={{ color: theme.primary }}
                        >
                            Production Ready
                        </div>
                    </div>
                    <div>
                        <div 
                            className="text-2xl font-bold"
                            style={{ color: theme.accent }}
                        >
                            {Array.from(new Set(projects.flatMap(p => p.tech))).length}
                        </div>
                        <div 
                            className="text-xs opacity-80"
                            style={{ color: theme.primary }}
                        >
                            Technologies Used
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}