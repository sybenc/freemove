import Rect, { Coord } from "./rect";

// 判断一个点是否在矩形里面
export function rect_is_inside(this: Rect, coord: Coord): boolean {
  if (coord.x >= this.x && coord.x <= this.x + this.w && coord.y >= this.y && coord.y <= this.y + this.h) {
    return true;
  }
  return false;
}
