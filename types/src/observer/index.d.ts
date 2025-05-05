export declare class Observer {
    root: Element;
    board: Element;
    rootDOMRect: DOMRect;
    boardDOMRect: DOMRect;
    update(): void;
    get boardCoord(): {
        x: number;
        y: number;
    };
    constructor(root: Element, board: Element);
}
