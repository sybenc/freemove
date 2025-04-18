declare class AlignLine {
    g: SVGGElement;
    lines: Record<AlignLineType | "vertical", SVGLineElement>;
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}

declare type AlignLineType = "vl" | "vc" | "vr" | "ht" | "hc" | "hb";

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

declare class SeletedBorder {
    g: SVGGElement;
    points: SVGRectElement[];
    lines: SVGLineElement[];
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}

declare interface Store {
    container: HTMLElement;
    nodes: HTMLElement[];
    selected: HTMLElement | null;
    svg: SVGSVGElement;
    alignLine: AlignLine;
    seletedBorder: SeletedBorder;
    resize: Resize;
    selector: Selector;
    gap: Gap;
    setSelected: (target: HTMLElement | null) => void;
}

export { }
