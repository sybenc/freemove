export class Observer<T extends Element> {
  root: Element;
  board: Element;
  rootDOMRect: DOMRect;
  boardDOMRect: DOMRect;
  __resizeOberver: ResizeObserver

  get boardCoord() {
    return {
      x: Math.round(this.boardDOMRect.x - this.rootDOMRect.x),
      y: Math.round(this.boardDOMRect.y - this.rootDOMRect.y),
    };
  }

  constructor(root: Element, board: Element) {
    this.board = board;
    this.root = root;
    this.rootDOMRect = this.root.getBoundingClientRect();
    this.boardDOMRect = this.board.getBoundingClientRect();
    this.__resizeOberver = new ResizeObserver(() => {
      this.rootDOMRect = this.root.getBoundingClientRect();
      this.boardDOMRect = this.board.getBoundingClientRect();
    });
    this.__resizeOberver.observe(this.root);
    this.__resizeOberver.observe(this.board);
  }
}
