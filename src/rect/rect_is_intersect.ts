import Rect from "./rect";

// 判断两个矩形是否相交
export function rect_is_intersect(this: Rect, rect: Pick<Rect, "x" | "y" | "w" | "h">): boolean {
  const x1A = this.x + 0.01;
  const y1A = this.y + 0.01;
  const x2A = this.x + this.w - 0.01;
  const y2A = this.y + this.h - 0.01;
  const x1B = rect.x;
  const y1B = rect.y;
  const x2B = rect.x + rect.w;
  const y2B = rect.y + rect.h;

  return !(x2A < x1B || x1A > x2B || y2A < y1B || y1A > y2B);
}
