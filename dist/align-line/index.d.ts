import { Store } from '../store';
import { AlignLineType } from './type';
export declare const alignLineTypes: AlignLineType[];
export declare class AlignLine {
    g: SVGGElement;
    constructor(svg: SVGSVGElement);
    get nodes(): SVGGElement;
    clear(): void;
    reRender(store: Store): void;
}
