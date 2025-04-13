import Rect from "../rect";

// 分别对应六条对齐线
// vl   vertical-left       竖直方向，左侧对齐线
// vc   vertical-center     竖直方向，中心对齐线
// vr   vertical-right      竖直方向，右侧对齐线
// ht   horizontal-top      水平方向，顶部对齐线
// hc   horizontal-center   水平方向，中心对齐线
// hb   horizontal-bottom   水平方向，底部对齐线
export type AlignLineType =
  | "vl"
  | "vc"
  | "vr"
  | "ht"
  | "hc"
  | "hb";

// 绘制对齐线所需数据
export interface AlignLineData {
  type: AlignLineType
  // 开始位置
  source: number
  // 结束位置
  target: number
  // 吸附距离
  absorbDistance: number
  // 吸附位置
  absorbPosition: number
  // 相关联矩形
  nodeRects: Rect[]
}

