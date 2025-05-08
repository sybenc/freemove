export type Observer = {
    root: Element;
    board: Element;
    rootDOMRect: DOMRect;
    boardDOMRect: DOMRect;
    readonly boardCoord: {
        x: number;
        y: number;
    };
};
