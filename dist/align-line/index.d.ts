import { Store } from '../store';
import { AlignLineType } from './type';
export declare const alignLineTypes: AlignLineType[];
export declare class AlignLine {
    g: SVGGElement;
    lines: Record<AlignLineType, SVGLineElement>;
    constructor(svg: SVGSVGElement);
    hidden(): void;
    reRender(store: Store): void;
}
