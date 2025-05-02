import Node from "../rect";

// 间距区域接口
export interface GapRegion {
  x: number;
  y: number;
  w: number;
  h: number;
  rect1: Node[];
  rect2: Node[];
}

export interface EdgeCoord {
  value: number;
  type: "min" | "max";
  nodeRect: Readonly<Node>;
}
