import { ClassName } from "./const";
import { toPx } from "./utils";

type AllDomElements =
  | HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  | SVGElementTagNameMap[keyof SVGElementTagNameMap];
export interface Coord {
  x: number;
  y: number;
}

export interface RectConstrustor {
  x: number;
  y: number;
  h: number;
  w: number;
  node: HTMLElement;
}

export default class Rect {
  #x: number;
  #y: number;
  #w: number;
  #h: number;
  #id: string;
  node: HTMLElement;
  parent: Rect | null = null;
  children: Rect[] = [];

  constructor({ x, y, h, w, node }: RectConstrustor) {
    this.#x = x;
    this.#y = y;
    this.#h = h;
    this.#w = w;
    this.node = node;
    this.#id = String(node.dataset.id);
  }

  #translate() {
    this.node.style.transform = `translate(${this.#x}px, ${this.#y}px)`;
  }

  get id() {
    return this.#id;
  }

  get x() {
    return this.#x;
  }
  set x(value: number) {
    this.#x = value;
    this.#translate();
  }

  get y() {
    return this.#y;
  }
  set y(value: number) {
    this.#y = value;
    this.#translate();
  }

  get w() {
    return this.#w;
  }
  set w(value: number) {
    this.#w = value;
    this.node.style.width = toPx(value);
  }

  get h() {
    return this.#h;
  }
  set h(value: number) {
    this.#h = value;
    this.node.style.height = toPx(value);
  }

  set error(value: boolean) {
    this.attr("data-error", String(value));
  }
  get error(): boolean {
    return this.getAttr("data-error") === "true";
  }

  set lock(value: boolean) {
    this.attr("data-lock", String(value));
  }
  get lock(): boolean {
    return this.getAttr("data-lock") === "true";
  }

  // 判断一个点是否在矩形里面
  isInSide(coord: Coord): boolean {
    if (coord.x >= this.x && coord.x <= this.x + this.w && coord.y >= this.y && coord.y <= this.y + this.h) {
      return true;
    }
    return false;
  }

  // 判断两个矩形是否相交
  isIntersect(rect: Pick<Rect, "x" | "y" | "w" | "h">): boolean {
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

  isBoard(): boolean {
    return this.isClassed(ClassName.Board);
  }

  isNode(): boolean {
    return this.isClassed(ClassName.MovableNode);
  }

  isContainer(): boolean {
    return this.isClassed(ClassName.Container);
  }

  // 相对于父元素对齐
  align(type: "h-start" | "h-center" | "h-end" | "v-top" | "v-center" | "v-bottom") {
    if (!this.parent) return;
    const parent = this.parent;
    switch (type) {
      case "h-start":
        this.x = 0;
        break;
      case "h-center":
        this.x = parent.w / 2 - this.w / 2;
        break;
      case "h-end":
        this.x = parent.w - this.w;
        break;
      case "v-top":
        this.y = 0;
        break;
      case "v-center":
        this.y = parent.h / 2 - this.h / 2;
        break;
      case "v-bottom":
        this.x = parent.h - this.h;
        break;
      default:
        break;
    }
  }

  classed(name: string, value: boolean) {
    const names = name.split(" ");
    if (value) this.node.classList.add(...names);
    else this.node.classList.remove(...names);
  }

  isClassed(name: string): boolean {
    return this.node.classList.contains(name);
  }

  style<K extends keyof Omit<CSSStyleDeclaration, "top" | "left" | "width" | "height">>(
    name: K,
    value: CSSStyleDeclaration[K]
  ) {
    this.node.style[name] = value;
    return this;
  }

  attr(name: string, value: string): Rect {
    if (name in this.node) {
      (this.node as any)[name] = value;
    } else {
      this.node.setAttribute(name, value as string);
    }
    return this;
  }

  getAttr(value: string) {
    return this.node.getAttribute(value);
  }

  // 从dom元素的style构建Rect对象
  static from(node: HTMLElement): Rect {
    const computedStyle = getComputedStyle(node);
    const rectTree = new Rect({
      x: parseInt(computedStyle.left) || 0,
      y: parseInt(computedStyle.top) || 0,
      w: parseInt(computedStyle.width) || 0,
      h: parseInt(computedStyle.height) || 0,
      node,
    });
    if (Rect.isBoard(node)) {
      rectTree.parent = null;
    }
    Array.from(node.children).forEach((child) => {
      const rectChild = Rect.from(child as HTMLElement);
      rectChild.parent = rectTree;
      rectTree.children.push(rectChild);
    });
    return rectTree;
  }

  static isBoard(node: HTMLElement): boolean {
    return node.classList.contains(ClassName.Board);
  }

  static isNode(node: HTMLElement): boolean {
    return node.classList.contains(ClassName.MovableNode);
  }

  static isContainer(node: HTMLElement): boolean {
    return node.classList.contains(ClassName.Container);
  }
}
