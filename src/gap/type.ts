import Rect from "../rect";

// 间距区域接口
export interface GapRegion {
  x: number;
  y: number;
  w: number;
  h: number;
  rect1: Rect[];
  rect2: Rect[];
}

export interface EdgeCoord {
  value: number;
  type: "min" | "max";
  nodeRect: Readonly<Rect>;
}
