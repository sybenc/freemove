import {Rect} from "@sybenc/freemove-types";

// 分别对应六条对齐线
// vl   vertical-left       竖直方向，左侧对齐线
// vc   vertical-center     竖直方向，中心对齐线
// vr   vertical-right      竖直方向，右侧对齐线
// ht   horizontal-top      水平方向，顶部对齐线
// hc   horizontal-center   水平方向，中心对齐线
// hb   horizontal-bottom   水平方向，底部对齐线
export type AlignLineType = "vl" | "vc" | "vr" | "ht" | "hc" | "hb";

// 绘制对齐线所需数据
export interface AlignLineData {
  // 对齐线类型（如 'vl' 表示垂直左侧对齐线）
  type: AlignLineType;
  // 线段的起始坐标（水平线为 x 轴，垂直线为 y 轴）
  start: number;
  // 线段的结束坐标（水平线为 x 轴，垂直线为 y 轴）
  end: number;
  // 吸附距离（选中节点与目标节点的对齐点距离）
  diff: number;
  // 吸附位置（目标节点的对齐点坐标）
  to: number;
  // 关联的矩形列表（触发对齐线的节点）
  rects: ReadonlyArray<Rect>;
}
