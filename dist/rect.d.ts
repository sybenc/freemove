import { AlignLineType } from './align-line/type';
export interface Position {
    x: number;
    y: number;
}
export default class Rect {
    x: number;
    y: number;
    w: number;
    h: number;
    id: string;
    node: HTMLElement;
    constructor({ x, y, h, w, node }: {
        x: number;
        y: number;
        h: number;
        w: number;
        node: HTMLElement;
    });
    isInSide(position: Position): boolean;
    isEquel(rect: Rect): boolean;
    isIntersect(rect: {
        x: number;
        y: number;
        h: number;
        w: number;
    }): boolean;
    getAlignLinePostion(): Record<AlignLineType, number>;
    static from(node: HTMLElement): Rect;
}
