import { AlignLine } from './align-line';
import { SeletedBorder } from './selected-border';
import { Resize } from './resize';
export interface Store {
    container: HTMLElement;
    nodes: HTMLElement[];
    selected: HTMLElement | null;
    moveDelta: [number, number];
    svg: SVGSVGElement;
    alignLine: AlignLine;
    seletedBorder: SeletedBorder;
    resize: Resize;
    setSelected: (target: HTMLElement | null) => void;
}
export declare const initStore: (container: HTMLElement, nodes: HTMLElement[]) => Store;
