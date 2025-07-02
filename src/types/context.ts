import { CommandContext } from "@/app/page";

export interface AllCommandContext {
    ctx: CommandContext;
    args: Record<string, any>
}