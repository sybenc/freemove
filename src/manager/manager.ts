import { Command } from "./command/command";

export default class Manager {
  private undoStack: Array<Command> = [];
  private redoStack: Array<Command> = [];
  private maximum: number = 150;

  execute(command: Command) {
    command.exec();
    if (command.record) {
      if (this.undoStack.length === this.maximum) {
        this.undoStack.shift();
      }
      this.undoStack.push(command);
      this.redoStack = [];
    }
  }

  undo() {
    const command = this.undoStack.pop();
    if (!command) return;
    command.undo();
    if (this.redoStack.length === this.maximum) {
      this.redoStack.shift();
    }
    this.redoStack.push(command);
  }

  redo() {
    const command = this.redoStack.pop();
    if (!command) return;
    command.exec();
    if (this.undoStack.length === this.maximum) {
      this.undoStack.shift();
    }
    this.undoStack.push(command);
  }
}
