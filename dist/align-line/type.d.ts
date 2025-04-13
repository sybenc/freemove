import { default as Rect } from '../rect';
export type AlignLineType = "vl" | "vc" | "vr" | "ht" | "hc" | "hb";
export interface AlignLineData {
    type: AlignLineType;
    source: number;
    target: number;
    absorbDistance: number;
    absorbPosition: number;
    nodeRects: Rect[];
}
