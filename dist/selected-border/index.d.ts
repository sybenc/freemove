import { Store } from '../store';
export declare class SeletedBorder {
    g: SVGGElement;
    points: SVGRectElement[];
    lines: SVGLineElement[];
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}
