import { useTheme } from "@/providers/ThemeProvider";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { Fragment } from "react";

const placeholderMap: Record<string, React.JSX.Element> = {
    NEXTJS: <RiNextjsFill className="inline text-xl" />,
    TAILWIND: <RiTailwindCssFill className="inline text-xl" />
};

function parseWithPlaceholders(text: string): React.ReactNode[] {
    const parts = text.split(/(\{[A-Z]+\})/g); // Split on {UPPERCASE}
    return parts.map((part, i) => {
        const match = part.match(/^\{([A-Z]+)\}$/);
        if (match) {
            const key = match[1];
            return <Fragment key={i}>{placeholderMap[key] || part}</Fragment>;
        }
        return <Fragment key={i}>{part}</Fragment>;
    });
}

export function InformationalFrame() {
    const { currentTheme: theme } = useTheme();

    return (
        <div
            style={{ color: theme.foreground, borderColor: theme.accent }}
            className="flex flex-col p-2 justify-center border rounded-lg"
        >
            <div
                className="flex mb-2 justify-center"
                style={{ color: theme.success }}
            >
                Informational Frame
            </div>
            <div className="flex flex-col space-y-4 p-2">
                {[
                    "Hey!",
                    `Welcome to my portfolio, this is written in {NEXTJS} and {TAILWIND}!`,
                    "You can run the `help` command so you can get much much more information and commands to run.",
                    "Thanks for viewing my terminal and check out my projects at `projects`"
                ].map((line, idx) => (
                    <div key={idx}>
                        AbdullahCXD:{" "}
                        <span style={{ color: theme.warning }}>
                            {parseWithPlaceholders(line)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
