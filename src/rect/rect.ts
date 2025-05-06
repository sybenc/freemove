import d3, { DomSelection } from "@sybenc/ruler/dist/d3";
import { rect_from } from "./rect_from";
import { rect_is_inside } from "./rect_is_inside";
import { rect_align } from "./rect_align";
import { rect_is_intersect } from "./rect_is_intersect";
import { rect_is_movable } from "./rect_is_movable";
import { rect_is_container } from "./rect_is_container";
import { rect_is_board } from "./rect_is_board";
import { rect_remove } from "./rect_remove";
import { rect_add_child } from "./rect_add_child";
import { rect_find } from "./rect_find";
import { rect_traverse } from "./rect_traverse";
import { rect_clone } from "./rect_clone";
import { rect_is_assist } from "./rect_is_assist";
import { rect_is_root } from "./rect_is_root";

export interface RectConstructor {
  x: number;
  y: number;
  h: number;
  w: number;
  node: HTMLElement;
}

export interface Coord {
  x: number;
  y: number;
}

export default class Rect {
  #x: number;
  #y: number;
  #w: number;
  #h: number;
  #id: string;
  node: DomSelection;
  parent: Rect | null = null;
  children: Rect[] = [];

  constructor({ x, y, h, w, node }: RectConstructor) {
    this.#x = x;
    this.#y = y;
    this.#h = h;
    this.#w = w;
    this.node = d3.select(node);
    this.#id = String(node.dataset.id);
  }

  get id() {
    return this.#id;
  }
  get x() {
    return this.#x;
  }
  set x(value: number) {
    this.#x = value;
    this.node.style("left", `${value}px`);
  }
  get y() {
    return this.#y;
  }
  set y(value: number) {
    this.#y = value;
    this.node.style("top", `${value}px`);
  }
  get w() {
    return this.#w;
  }
  set w(value: number) {
    this.#w = value;
    this.node.style("width", `${value}px`);
  }
  get h() {
    return this.#h;
  }
  set h(value: number) {
    this.#h = value;
    this.node.style("height", `${value}px`);
  }
  set error(value: boolean) {
    this.node.attr("data-error", value);
  }
  get error(): boolean {
    return Boolean(this.node.attr("data-error"));
  }

  isInside = rect_is_inside;
  isIntersect = rect_is_intersect;
  align = rect_align;
  remove = rect_remove;
  addChild = rect_add_child;
  find = rect_find;
  clone = rect_clone;

  static from = rect_from;
  static traverse = rect_traverse;
  static isMovable = rect_is_movable;
  static isContainer = rect_is_container;
  static isBoard = rect_is_board;
  static isAssist = rect_is_assist;
  static isRoot = rect_is_root;
}
