import { Command } from "./command";

export class CompositeCommand implements Command {
  private commands: Command[];
  record: boolean = true;

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  exec() {
    for (const command of this.commands) {
      command.exec();
    }
  }

  undo() {
    // 撤销时顺序要反过来
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }
}
