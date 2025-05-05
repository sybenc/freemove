import { Rect } from "../../rect";
import { Coord } from "../../rect/rect";
import { Command } from "./command";
export declare class CommandMoveRect implements Command {
    private selectedRect;
    private value;
    private snapshot;
    record: boolean;
    constructor(selectedRect: Rect, value: Coord, snapshot: Coord);
    undo(): void;
    exec(): void;
}
