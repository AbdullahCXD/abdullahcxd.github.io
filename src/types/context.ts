import { CommandContext } from "@/types/terminal";

export interface AllCommandContext {
    ctx: CommandContext;
    args: Record<string, any>
}