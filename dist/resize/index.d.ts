import { Store } from './../store';
export declare class Resize {
    g: SVGGElement;
    lines: SVGGElement[];
    constructor(svg: SVGSVGElement, nodes: HTMLElement[]);
    hidden(): void;
    reRender(store: Store, newWidth: number, newHeight: number, direction: string, startLeft: number, startTop: number, startWidth: number, startHeight: number): void;
}
