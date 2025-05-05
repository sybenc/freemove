import { DomSelection } from "@sybenc/ruler/dist/d3";
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
export interface RectConstrustor {
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
    #private;
    node: DomSelection;
    parent: Rect | null;
    children: Rect[];
    constructor({ x, y, h, w, node }: RectConstrustor);
    get id(): string;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get w(): number;
    set w(value: number);
    get h(): number;
    set h(value: number);
    set error(value: boolean);
    get error(): boolean;
    isInside: typeof rect_is_inside;
    isIntersect: typeof rect_is_intersect;
    align: typeof rect_align;
    remove: typeof rect_remove;
    addChild: typeof rect_add_child;
    find: typeof rect_find;
    clone: typeof rect_clone;
    static from: typeof rect_from;
    static traverse: typeof rect_traverse;
    static isMovable: typeof rect_is_movable;
    static isContainer: typeof rect_is_container;
    static isBoard: typeof rect_is_board;
    static isAssist: typeof rect_is_assist;
    static isRoot: typeof rect_is_root;
}
