import { AlignLineData, AlignLineType } from "./type";
import { DomSelection } from "../d3";
import { Store } from "@sybenc/freemove-types";
export declare class Align {
    store: Store;
    g: DomSelection;
    lines: Record<AlignLineType | "vertical", DomSelection>;
    alternate: AlignLineData[];
    constructor(store: Store);
    render(): void;
    mount(): void;
    unmount(): void;
    hidden(): void;
}
