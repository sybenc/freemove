declare class Align {
    g: SVGGElement;
    lines: Record<AlignLineType | "vertical", SVGLineElement>;
    isHAlign: boolean;
    isVAlign: boolean;
    alternateNodes: Record<AlignLineType, AlignLineData[]>;
    showContainerAlignLine: boolean;
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}

declare interface AlignLineData {
    type: AlignLineType;
    source: number;
    target: number;
    absorbDistance: number;
    absorbPosition: number;
    nodeRects: ReadonlyArray<Rect>;
}

declare type AlignLineType = "vl" | "vc" | "vr" | "ht" | "hc" | "hb";

declare class Border {
    g: SVGGElement;
    points: SVGRectElement[];
    lines: SVGLineElement[];
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}

declare class Distance {
    g: SVGGElement;
    lines: Record<DistanceType, SVGGElement>;
    left: {
        length: number;
        node: HTMLElement | null;
    };
    right: {
        length: number;
        node: HTMLElement | null;
    };
    top: {
        length: number;
        node: HTMLElement | null;
    };
    bottom: {
        length: number;
        node: HTMLElement | null;
    };
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}

declare type DistanceType = 'left' | 'right' | 'bottom' | 'top';

declare class FreeMove {
    store: Store;
    constructor(container: HTMLElement, nodes: HTMLElement[]);
    mount(): void;
    unmount(): void;
    align(option: "start" | "center" | "end"): void;
}
export default FreeMove;

declare class Gap {
    g: SVGGElement;
    constructor(svg: SVGSVGElement);
    clear(): void;
    reRender(store: Store): void;
}

declare interface Position {
    x: number;
    y: number;
}

declare class Rect {
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
    sync(): void;
    set error(value: boolean);
    get error(): boolean;
    isInSide(position: Position): boolean;
    isIntersect(rect: Pick<Rect, "x" | "y" | "w" | "h">): boolean;
    getAlignLinePostion(): Record<AlignLineType, number>;
    static from(node: HTMLElement): Rect;
}

declare class Resize {
    g: SVGGElement;
    lines: SVGGElement[];
    constructor(svg: SVGSVGElement, nodes: HTMLElement[]);
    hidden(): void;
    reRender(store: Store, newWidth: number, newHeight: number, direction: string, startLeft: number, startTop: number, startWidth: number, startHeight: number): void;
}

declare class Selector {
    g: SVGGElement;
    selectorRect: SVGRectElement;
    previewRect: SVGRectElement;
    selectedGroup: HTMLElement[];
    constructor(svg: SVGSVGElement);
    hiddenSelector(): void;
    showSelector(): void;
    hiddenPreview(): void;
    showPreview(): void;
    reRender(store: Store, startX: number, startY: number, endX: number, endY: number): void;
}

declare interface Store {
    container: HTMLElement;
    nodes: HTMLElement[];
    svg: SVGSVGElement;
    selected: HTMLElement | null;
    setSelected: (target: HTMLElement | null) => void;
    searchError: () => void;
    gap: Gap;
    align: Align;
    distance: Distance;
    border: Border;
    resize: Resize;
    selector: Selector;
}

export { }
