import { CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { toPx } from "../utils";
import { SELECTED_BORDER_COLOR, SELECTED_BORDER_WIDTH } from "./const";
import { SelectedBorderLineType } from "./type";

const seletedBorderLineTypes: SelectedBorderLineType[] = ["left", "top", "right", "bottom"];
const selectedBorderLineCursor = ["ew-resize", "ns-resize", "ew-resize", "ns-resize"];

function createSeletedBorderDom(store: Store): SVGElement[] {
  const seletedRect = Rect.from(store.selected!);
  const nodes: SVGElement[] = [];
  seletedBorderLineTypes.forEach((type, index) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `${CLASS_PREFIX}-selected-border-line-${type}`);
    line.setAttribute("stroke", SELECTED_BORDER_COLOR);
    line.setAttribute("stroke-width", toPx(SELECTED_BORDER_WIDTH));
    line.setAttribute('style', `cursor: ${selectedBorderLineCursor[index]}`)
    const lineAction = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineAction.setAttribute("class", `${CLASS_PREFIX}-selected-border-line-action-${type}`);
    lineAction.setAttribute("stroke", "transparent");
    lineAction.setAttribute("stroke-width", "5px");
    lineAction.setAttribute('style', `cursor: ${selectedBorderLineCursor[index]}`)
    const group = [line, lineAction];

    switch (type) {
      case "left":
        group.forEach((item) => {
          item.setAttribute("x1", String(seletedRect.x));
          item.setAttribute("y1", String(seletedRect.y - SELECTED_BORDER_WIDTH / 2));
          item.setAttribute("x2", String(seletedRect.x));
          item.setAttribute("y2", String(seletedRect.y + seletedRect.h + SELECTED_BORDER_WIDTH / 2));
        });
        break;
      case "right":
        group.forEach((item) => {
          item.setAttribute("x1", String(seletedRect.x + seletedRect.w));
          item.setAttribute("y1", String(seletedRect.y - SELECTED_BORDER_WIDTH / 2));
          item.setAttribute("x2", String(seletedRect.x + seletedRect.w));
          item.setAttribute("y2", String(seletedRect.y + seletedRect.h + SELECTED_BORDER_WIDTH / 2));
        });
        break;
      case "top":
        group.forEach((item) => {
          item.setAttribute("x1", String(seletedRect.x - SELECTED_BORDER_WIDTH / 2));
          item.setAttribute("y1", String(seletedRect.y));
          item.setAttribute("x2", String(seletedRect.x + seletedRect.w + SELECTED_BORDER_WIDTH / 2));
          item.setAttribute("y2", String(seletedRect.y));
        });
        break;
      case "bottom":
        group.forEach((item) => {
          item.setAttribute("x1", String(seletedRect.x - SELECTED_BORDER_WIDTH / 2));
          item.setAttribute("y1", String(seletedRect.y + seletedRect.h));
          item.setAttribute("x2", String(seletedRect.x + seletedRect.w + SELECTED_BORDER_WIDTH / 2));
          item.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        });
        break;
    }

    nodes.push(line, lineAction)
  });

  return nodes;
}

export class SeletedBorder {
  g: SVGGElement;

  constructor(svg: SVGSVGElement) {
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${CLASS_PREFIX}-seleted-border`);
    svg.append(this.g);
  }

  clear() {
    this.g.innerHTML = "";
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.clear();
    this.g.append(...createSeletedBorderDom(store));
    createSeletedBorderDom(store);
  }
}
