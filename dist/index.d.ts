declare class Align {
    g: SVGGElement;
    lines: Record<AlignLineType | "vertical", SVGLineElement>;
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
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
    distanceGroups: Record<DistanceType, SVGGElement>;
    x: {
        type: 'left' | 'right';
        node: HTMLElement | null;
    };
    y: {
        type: 'top' | 'bottom';
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
    align: Align;
    border: Border;
    resize: Resize;
    selector: Selector;
    gap: Gap;
    distance: Distance;
}

export { }
