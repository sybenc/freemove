import { nanoid } from "nanoid";
import { Align } from "./align";
import { NodeClassPrefix } from "./const";
import { Border } from "./border";
import { createElementNS, toPx } from "./utils";
import { Resize } from "./resize";
import { Selector } from "./selector";
import { Distance } from "./distance";
import Rect from "./rect";
import { Gap } from "./gap";

export interface Store {
  board: HTMLElement;
  canvas: HTMLElement;
  nodes: HTMLElement[];
  svg: SVGSVGElement;
  scale: number;
  scaleRange: [number, number];
  translateX: number;
  translateY: number;
  selected: HTMLElement | null;
  setSelected: (target: HTMLElement | null) => void;
  searchError: () => void;
  syncNodes: () => void;

  gap: Gap;
  align: Align;
  distance: Distance;
  border: Border;
  resize: Resize;
  selector: Selector;
}

export const initStore = (board: HTMLElement, canvas: HTMLElement): Store => {
  const svg = createElementNS<SVGSVGElement>("svg");
  svg.setAttribute("class", `${NodeClassPrefix}-svg`);

  const boardRect = board.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  board.className += ` ${NodeClassPrefix}-board`;
  canvas.className += ` ${NodeClassPrefix}-canvas`;

  // 居中 canvas
  canvas.style.left = toPx((boardRect.width - canvasRect.width) / 2);
  canvas.style.top = toPx((boardRect.height - canvasRect.height) / 2);
  svg.setAttribute("width", toPx(canvasRect.width));
  svg.setAttribute("height", toPx(canvasRect.height));

  const nodes = Array.from(canvas.getElementsByTagName("div")) as HTMLElement[];
  nodes.forEach((node) => {
    node.className += ` ${NodeClassPrefix}-movable-node`;
    node.setAttribute("data-id", nanoid());
    if (/%$/.test(node.style.top)) node.style.top = toPx((canvasRect.width * parseFloat(node.style.top)) / 100);
    if (/%$/.test(node.style.left)) node.style.left = toPx((canvasRect.height * parseFloat(node.style.left)) / 100);
    if (/%$/.test(node.style.width)) node.style.width = toPx((canvasRect.width * parseFloat(node.style.width)) / 100);
    if (/%$/.test(node.style.height))
      node.style.height = toPx((canvasRect.height * parseFloat(node.style.height)) / 100);
  });

  return {
    board,
    canvas,
    nodes,
    svg,
    selected: null,
    scale: 1,
    scaleRange: [0.5, 2],
    translateX: 0,
    translateY: 0,
    setSelected(target: HTMLElement | null) {
      this.selected = target;
      if (!target) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this);
      this.searchError();
    },
    searchError() {
      if (!this.selected) return;
      const selectedRect = Rect.from(this.selected);
      selectedRect.error = false; // 先清除自身 error 状态

      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        if (node === this.selected) continue; // 避免和自己比较

        const nodeRect = Rect.from(node);
        const isIntersect = selectedRect.isIntersect(nodeRect);

        // 如果相交，标记两个都为 error
        if (isIntersect) {
          selectedRect.error = true;
          nodeRect.error = true;
          this.align.hidden();
          this.distance.hidden();
        } else {
          nodeRect.error = false;
        }
      }
    },

    syncNodes() {
      this.nodes = Array.from(canvas.getElementsByTagName("div")) as HTMLElement[];
    },

    gap: new Gap(svg),
    align: new Align(svg),
    distance: new Distance(svg),
    border: new Border(svg),
    resize: new Resize(svg, nodes),
    selector: new Selector(svg),
  };
};
