import { Command } from "@/manager";
export declare class CompositeCommand implements Command {
    private readonly commands;
    record: boolean;
    constructor(commands: Command[]);
    exec(): void;
    undo(): void;
}
