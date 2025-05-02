export interface Observer<T extends Element> {
    root: Element;
    board: Element;
    rootDOMRect: DOMRect;
    boardDOMRect: DOMRect;
    __resizeOberver: ResizeObserver;
    get boardCoord(): {
        x: number;
        y: number;
    };
}
