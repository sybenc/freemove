import { Store } from '../store';
export declare class SeletedBorder {
    g: SVGGElement;
    constructor(svg: SVGSVGElement);
    clear(): void;
    reRender(store: Store): void;
}
