import { Store } from '../store';
import { AlignLineType } from './type';
export declare const alignLineTypes: AlignLineType[];
export declare class AlignLine {
    g: SVGGElement;
    constructor(svg: SVGSVGElement);
    clear(): void;
    reRender(store: Store): void;
}
