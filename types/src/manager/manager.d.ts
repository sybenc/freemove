import { Command } from "@/manager/command/command";
export default class Manager {
    private undoStack;
    private redoStack;
    private maximum;
    execute(command: Command): void;
    undo(): void;
    redo(): void;
}
