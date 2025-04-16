import { Store } from './../store';
export declare class Selector {
    g: SVGGElement;
    selectorRect: SVGRectElement;
    previewRect: SVGRectElement;
    selectedGroup: HTMLElement[];
    constructor(svg: SVGSVGElement);
    hiddenSelector(): void;
    hiddenPreview(): void;
    reRender(store: Store, startX: number, startY: number, endX: number, endY: number): void;
}
