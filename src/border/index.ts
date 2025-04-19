import { NODE_CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { createElementNS, getElement, toPx } from "../utils";
import { BORDER_COLOR, BORDER_POINTS_SIDELENGTH, BORDER_WIDTH } from "./const";
import { SelectedBorderLineType, SelectedBorderPointType } from "./type";

const selectedBorderLineTypes: SelectedBorderLineType[] = ["left", "top", "right", "bottom"];
const selectedBorderPointTypes: SelectedBorderPointType[] = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left",
];
const selectedBorderLineCursor = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
];

function createSeletedBorderDom(): [points: SVGRectElement[], lines: SVGLineElement[]] {
  const points: SVGRectElement[] = [];
  const lines: SVGLineElement[] = [];
  selectedBorderLineTypes.forEach((type) => {
    const line = createElementNS<SVGLineElement>('line');
    line.setAttribute("class", `${NODE_CLASS_PREFIX}-border-line-${type}`);
    line.setAttribute("stroke", BORDER_COLOR);
    line.setAttribute("stroke-width", toPx(BORDER_WIDTH));

    lines.push(line);
  });

  selectedBorderPointTypes.forEach((type, index) => {
    const rect = createElementNS<SVGRectElement>('rect');
    rect.setAttribute("class", `${NODE_CLASS_PREFIX}-border-point-${type}`);
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", BORDER_COLOR);
    rect.setAttribute("stroke-width", toPx(BORDER_WIDTH));
    rect.setAttribute("width", toPx(BORDER_POINTS_SIDELENGTH));
    rect.setAttribute("height", toPx(BORDER_POINTS_SIDELENGTH));
    rect.setAttribute("style", `cursor: ${selectedBorderLineCursor[index]}`);
    rect.setAttribute("data-direction", type);
    points.push(rect);
  });

  return [points, lines];
}

function renderSelectedBorder(g: SVGGElement, selected: HTMLElement) {
  const seletedRect = Rect.from(selected);
  selectedBorderLineTypes.forEach((type) => {
    const line = getElement<SVGLineElement>(g, `${NODE_CLASS_PREFIX}-border-line-${type}`)
    switch (type) {
      case "left":
        line.setAttribute("x1", String(seletedRect.x));
        line.setAttribute("y1", String(seletedRect.y - BORDER_WIDTH / 2));
        line.setAttribute("x2", String(seletedRect.x));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + BORDER_WIDTH / 2));
        break;
      case "right":
        line.setAttribute("x1", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y1", String(seletedRect.y - BORDER_WIDTH / 2));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + BORDER_WIDTH / 2));
        break;
      case "top":
        line.setAttribute("x1", String(seletedRect.x - BORDER_WIDTH / 2));
        line.setAttribute("y1", String(seletedRect.y));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + BORDER_WIDTH / 2));
        line.setAttribute("y2", String(seletedRect.y));
        break;
      case "bottom":
        line.setAttribute("x1", String(seletedRect.x - BORDER_WIDTH / 2));
        line.setAttribute("y1", String(seletedRect.y + seletedRect.h));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + BORDER_WIDTH / 2));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        break;
    }
  });
  selectedBorderPointTypes.forEach((type, index) => {
    const rect = getElement<SVGRectElement>(g, `${NODE_CLASS_PREFIX}-border-point-${type}`)
    rect.setAttribute("data-owner-id", selected.dataset.id!);
    // 往左上角的偏移量，为边长的一半
    const offset = BORDER_POINTS_SIDELENGTH / 2;
    switch (type) {
      case "left-top":
        rect.setAttribute("x", String(seletedRect.x - offset));
        rect.setAttribute("y", String(seletedRect.y - offset));
        break;
      case "top":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - offset));
        rect.setAttribute("y", String(seletedRect.y - offset));
        break;
      case "right-top":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w - offset));
        rect.setAttribute("y", String(seletedRect.y - offset));
        break;
      case "right":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - offset));
        break;
      case "right-bottom":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h - offset));
        break;
      case "bottom":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h - offset));
        break;
      case "left-bottom":
        rect.setAttribute("x", String(seletedRect.x - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h - offset));
        break;
      case "left":
        rect.setAttribute("x", String(seletedRect.x - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - offset));
        break;
    }
  });
}

export class Border {
  g: SVGGElement;
  points: SVGRectElement[];
  lines: SVGLineElement[];

  constructor(svg: SVGSVGElement) {
    this.g = createElementNS<SVGGElement>('g');
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-border`);
    svg.append(this.g);
    const [points, lines] = createSeletedBorderDom();
    this.points = points;
    this.lines = lines;
    this.g.append(...lines, ...points);
    this.g.style.display = "none";
  }

  hidden() {
    this.g.style.display = "none";
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.g.style.display = "block";
    renderSelectedBorder(this.g, store.selected);
  }
}
