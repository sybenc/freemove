import { AlignLineType } from "./align-line/type";

const Tolerance = 3;

export interface Position {
  x: number;
  y: number;
}

export default class Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  node: HTMLElement;

  constructor({ x, y, h, w, node }: { x: number; y: number; h: number; w: number; node: HTMLElement }) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.node = node;
  }

  // 判断一个点是否在矩形里面
  isInSide(position: Position) {
    if (
      position.x >= this.x &&
      position.x <= this.x + this.w &&
      position.y >= this.y && 
      position.y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }

  isEquel(rect: Rect) {
    if (
      this.h === rect.h && 
      this.w === rect.w && 
      this.x === rect.x &&
      this.y === rect.y && 
      this.node === rect.node
    ) return true;
    return false;
  }

  // 判断两个矩形是否相交，Tolerance为容差
  isIntersect(rect: Rect) {
    const x1A = this.x + Tolerance;
    const y1A = this.y + Tolerance;
    const x2A = this.x + this.w - Tolerance;
    const y2A = this.y + this.h - Tolerance;
    const x1B = rect.x;
    const y1B = rect.y;
    const x2B = rect.x + rect.w;
    const y2B = rect.y + rect.h;

    if (x2A < x1B || x1A > x2B || y2A < y1B || y1A > y2B) {
      return false;
    }
    return true;
  }

  getAlignLinePostion(): Record<AlignLineType, number> {
    return {
      vl: this.x,
      vc: this.x + this.w / 2,
      vr: this.x + this.w,
      ht: this.y,
      hc: this.y + this.h / 2,
      hb: this.y + this.h,
    };
  }

  // 从dom元素的style构建Rect对象
  static from(node: HTMLElement): Rect {
    return new Rect({
      x: node.offsetLeft,
      y: node.offsetTop,
      w: node.offsetWidth,
      h: node.offsetHeight,
      node,
    });
  }
}
