import {AlignLineType} from "./type";
import {Rect} from "@sybenc/freemove-types";

export function getRectAlign(rect: Rect): Record<AlignLineType, number> {
  return {
    vl: rect.x,
    vc: rect.x + rect.w / 2,
    vr: rect.x + rect.w,
    ht: rect.y,
    hc: rect.y + rect.h / 2,
    hb: rect.y + rect.h,
  };
}