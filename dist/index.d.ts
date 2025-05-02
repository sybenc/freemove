declare interface Coord {
    x: number;
    y: number;
}

declare class FreeMove {
    store: Store;
    constructor(root: HTMLElement, board: HTMLElement);
    mount(): void;
    unmount(): void;
}
export default FreeMove;

declare class Rect {
    #private;
    node: HTMLElement;
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
    set lock(value: boolean);
    get lock(): boolean;
    isInSide(coord: Coord): boolean;
    isIntersect(rect: Pick<Rect, "x" | "y" | "w" | "h">): boolean;
    isBoard(): boolean;
    isNode(): boolean;
    isContainer(): boolean;
    align(type: "h-start" | "h-center" | "h-end" | "v-top" | "v-center" | "v-bottom"): void;
    classed(name: string, value: boolean): void;
    isClassed(name: string): boolean;
    style<K extends keyof Omit<CSSStyleDeclaration, "top" | "left" | "width" | "height">>(name: K, value: CSSStyleDeclaration[K]): this;
    attr(name: string, value: string): Rect;
    getAttr(value: string): string | null;
    static from(node: HTMLElement): Rect;
    static isBoard(node: HTMLElement): boolean;
    static isNode(node: HTMLElement): boolean;
    static isContainer(node: HTMLElement): boolean;
}

declare interface RectConstrustor {
    x: number;
    y: number;
    h: number;
    w: number;
    node: HTMLElement;
}

declare class Store {
    #private;
    root: HTMLElement;
    rootDOMRect: DOMRect;
    board: HTMLElement;
    boardDOMRect: DOMRect;
    svg: SVGSVGElement;
    svgDOMRect: DOMRect;
    nodeRects: Rect;
    get boardCoord(): Coord;
    syncRootDOMRect(): void;
    syncSvgDOMRect(): void;
    syncBoardDOMRect(): void;
    syncNodeRects(): void;
    get selectedRect(): Rect;
    set selectedRect(nodeRect: Rect);
    searchError(): void;
    scaleExtent: [number, number];
    scale: number;
    translateX: number;
    translateY: number;
    applyTransform(): void;
    constructor(root: HTMLElement, board: HTMLElement);
}

export { }
