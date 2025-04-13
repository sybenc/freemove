import { AlignLine } from './align-line';
export interface Store {
    container: HTMLElement;
    nodes: HTMLElement[];
    selected: HTMLElement | null;
    svg: SVGSVGElement;
    alignLine: AlignLine;
    setSelected: (target: HTMLElement | null) => void;
}
export declare const initStore: (container: HTMLElement, nodes: HTMLElement[]) => Store;
