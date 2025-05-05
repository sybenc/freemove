export class Observer {
  root: Element;
  board: Element;
  rootDOMRect!: DOMRect;
  boardDOMRect!: DOMRect;

  // 主动更新 DOMRect
  update() {
    this.rootDOMRect = this.root.getBoundingClientRect();
    this.boardDOMRect = this.board.getBoundingClientRect();
  }

  get boardCoord() {
    return {
      x: Math.round(this.boardDOMRect.x - this.rootDOMRect.x),
      y: Math.round(this.boardDOMRect.y - this.rootDOMRect.y),
    };
  }

  constructor(root: Element, board: Element) {
    this.board = board;
    this.root = root;
    this.update()
  }
}
