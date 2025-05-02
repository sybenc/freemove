import { nanoid } from "nanoid";
import { ClassName, ClassPrefix } from "./const";
import { createElementNS, toPx } from "./utils";
import Node, { Coord } from "./rect";
import { _Ruler } from "./ruler/src/ruler/ruler";
import Ruler from "./ruler/src/ruler/tooltip";

export class Store {
  root: HTMLElement;
  rootDOMRect: DOMRect;
  board: HTMLElement;
  boardDOMRect: DOMRect;
  svg: SVGSVGElement;
  svgDOMRect: DOMRect;
  nodeRects: Node;

  get boardCoord(): Coord {
    return {
      x: Math.round(this.boardDOMRect.x - this.rootDOMRect.x),
      y: Math.round(this.boardDOMRect.y - this.rootDOMRect.y),
    };
  }

  syncRootDOMRect() {
    this.rootDOMRect = this.root.getBoundingClientRect();
  }

  syncSvgDOMRect() {
    this.svgDOMRect = this.svg.getBoundingClientRect();
  }

  syncBoardDOMRect() {
    this.boardDOMRect = this.board.getBoundingClientRect();
  }

  syncNodeRects() {
    this.nodeRects = Node.from(this.board);
  }

  #selectedRect: Node;
  get selectedRect() {
    return this.#selectedRect;
  }

  set selectedRect(nodeRect: Node) {
    this.#selectedRect = nodeRect;
    // this.border.draw();
    this.searchError();
  }

  searchError() {
    if (!this.selectedRect) return;
    const nodeRects = this.selectedRect.parent?.children;
    if (!nodeRects) return;
    this.selectedRect.error = false;

    for (let i = 0; i < nodeRects.length; i++) {
      const nodeRect = nodeRects[i];
      if (nodeRect.id === this.selectedRect.id) continue; // 避免和自己比较

      const isIntersect = this.selectedRect.isIntersect(nodeRect);

      // 如果相交，标记两个都为 error
      if (isIntersect) {
        this.selectedRect.error = true;
        nodeRect.error = true;
        // this.align.hidden();
        // this.distance.hidden();
      } else {
        nodeRect.error = false;
      }
    }
  }

  scaleExtent: [number, number] = [0.4, 50];
  scale: number = 1;
  translateX: number = 0;
  translateY: number = 0;

  applyTransform() {
    this.board.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    this.svg.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;

    // 再重新设置像素比和缩放
    this.syncBoardDOMRect();
    this.syncRootDOMRect();
    this.syncSvgDOMRect();
  }

  constructor(root: HTMLElement, board: HTMLElement) {
    this.svg = createElementNS<SVGSVGElement>("svg");
    this.svgDOMRect = this.svg.getBoundingClientRect();
    this.root = root;
    this.root.style.position = "relative";
    this.rootDOMRect = this.root.getBoundingClientRect();
    this.board = board;
    this.boardDOMRect = this.board.getBoundingClientRect();
    this.root.style.overflow = "hidden"
    this.svg.style.transformOrigin = "0 0";
    this.board.style.transformOrigin = "0 0";

    const nodes = Array.from(board.getElementsByTagName("div")) as HTMLElement[];
    nodes.forEach((node) => {
      node.className += ` ${ClassPrefix}-node`;
      node.setAttribute("data-id", nanoid(10));
      if (/%$/.test(node.style.top))
        node.style.top = toPx((this.boardDOMRect.width * parseFloat(node.style.top)) / 100);
      if (/%$/.test(node.style.left))
        node.style.left = toPx((this.boardDOMRect.height * parseFloat(node.style.left)) / 100);
      if (/%$/.test(node.style.width))
        node.style.width = toPx((this.boardDOMRect.width * parseFloat(node.style.width)) / 100);
      if (/%$/.test(node.style.height))
        node.style.height = toPx((this.boardDOMRect.height * parseFloat(node.style.height)) / 100);
    });
    this.nodeRects = Node.from(this.board);
    this.#selectedRect = this.nodeRects;

    root.classList.add(ClassName.Container);
    board.classList.add(ClassName.Board, ClassName.Container);

    // 居中
    board.style.left = toPx(Math.round((this.rootDOMRect.width - this.boardDOMRect.width) / 2));
    board.style.top = toPx(Math.round((this.rootDOMRect.height - this.boardDOMRect.height) / 2));
    board.setAttribute("data-id", nanoid(10));
    this.syncBoardDOMRect();
    this.syncSvgDOMRect();

    // this.ruler = new Ruler(this);
    // this.ruler.render();

    // const rulerY = new RulerY(this)
    // rulerY.applyTransform()
    const ruler = new _Ruler(root,board)
    // const rootSelect = d3.select(this.root);
    // const zoom = d3
    //   .zoom()
    //   .on("zoom", (event: D3ZoomEvent<HTMLElement, undefined>) => {
    //     const { k } = event.transform;
    //     // 计算鼠标位置相对于 board 的偏移
    //     const [mouseX, mouseY] = d3.pointer(event, this.board)

    //     // 调整平移以保持鼠标位置固定
    //     this.translateX -= (mouseX / this.scale - mouseX /k) * k
    //     this.translateY -= (mouseY / this.scale - mouseY /k) * k
    //     this.scale = k;

    //     this.applyTransform();
    //     ruler.applyTransform()
    //   });
    // rootSelect.call(zoom as any);

    this.root.addEventListener("wheel", (event: WheelEvent) => {
      event.preventDefault();
      const [minScale, maxScale] = this.scaleExtent;

      if (event.ctrlKey) {
        // 缩放操作
        const rect = this.boardDOMRect;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        // 计算缩放增量
        const zoomDelta = event.deltaY * -0.01;
        let newScale = this.scale * (1 + zoomDelta);
        newScale = Math.max(minScale, Math.min(maxScale, newScale));
        console.log(newScale)

        // 调整平移以保持鼠标位置固定
        this.translateX -= (mouseX / this.scale - mouseX / newScale) * newScale;
        this.translateY -= (mouseY / this.scale - mouseY / newScale) * newScale;
        this.scale = newScale;

        this.applyTransform();
        ruler.x.applyTransform(this.scale, this.translateX,this.translateY)
        ruler.y.applyTransform(this.scale, this.translateX,this.translateY)
      } else {
        // 平移操作
        this.translateX -= event.deltaX;
        this.translateY -= event.deltaY;
        this.applyTransform();
        ruler.x.applyTransform(this.scale, this.translateX,this.translateY)
        ruler.y.applyTransform(this.scale, this.translateX,this.translateY)
      }
    });
    // this.border = new Border(this);
    // this.align = new Align(this.svg);
    // this.distance = new Distance(this.svg);
    // this.gap = new Gap(this.svg);
    // this.resize = new Resize(this.svg, this.nodes);
    // this.selector = new Selector(this.svg);
  }
}
