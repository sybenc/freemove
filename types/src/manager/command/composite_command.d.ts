import { Command } from "./command";
export declare class CompositeCommand implements Command {
    private commands;
    record: boolean;
    constructor(commands: Command[]);
    exec(): void;
    undo(): void;
}
