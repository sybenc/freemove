import { Rect } from "../../rect";
import { Command } from "./command";
export declare class CommandRemoveRect implements Command {
    parent: Rect;
    rect: Rect;
    record: boolean;
    constructor(parent: Rect, rect: Rect);
    undo(): void;
    exec(): void;
}
