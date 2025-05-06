import {Command} from "@/manager";
import {Rect} from "@/rect";
import {Coord} from "@/rect/rect";

export class CommandMoveRect implements Command {
  private selectedRect: Rect;
  private value: Coord;
  private snapshot: Coord;
  record: boolean = true;

  constructor(selectedRect: Rect, value: Coord, snapshot: Coord) {
    this.selectedRect = selectedRect;
    this.value = value;
    this.snapshot = snapshot;
  }

  undo() {
    this.selectedRect.x = this.snapshot.x;
    this.selectedRect.y = this.snapshot.y;
  }

  exec() {
    this.selectedRect.x = this.value.x;
    this.selectedRect.y = this.value.y;
  }
}
