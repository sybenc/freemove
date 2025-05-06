import { Command } from "@/manager";
import { Rect } from "@/rect";
export declare class CommandRemoveRect implements Command {
    parent: Rect;
    rect: Rect;
    record: boolean;
    constructor(parent: Rect, rect: Rect);
    undo(): void;
    exec(): void;
}
