import {Command} from "@/manager";
import {Rect} from "@/rect";


export class CommandRemoveRect implements Command {
  parent: Rect;
  rect: Rect;
  record: boolean = true;

  constructor(parent: Rect, rect: Rect) {
    this.parent = parent;
    this.rect = rect;
  }

  undo() {
    this.parent.addChild(this.rect);
  }

  exec() {
    this.rect.remove();
  }
}
