import { Rect } from "@sybenc/freemove-types";
export type AlignLineType = "vl" | "vc" | "vr" | "ht" | "hc" | "hb";
export interface AlignLineData {
    type: AlignLineType;
    start: number;
    end: number;
    diff: number;
    to: number;
    rects: ReadonlyArray<Rect>;
}
