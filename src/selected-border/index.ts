import { NODE_CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { toPx } from "../utils";
import { SELECTED_BORDER_COLOR, SELECTED_BORDER_POINTS_SIDELENGTH, SELECTED_BORDER_WIDTH } from "./const";
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
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `${NODE_CLASS_PREFIX}-selected-border-line-${type}`);
    line.setAttribute("stroke", SELECTED_BORDER_COLOR);
    line.setAttribute("stroke-width", toPx(SELECTED_BORDER_WIDTH));

    lines.push(line);
  });

  selectedBorderPointTypes.forEach((type, index) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", `${NODE_CLASS_PREFIX}-selected-border-point-${type}`);
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", SELECTED_BORDER_COLOR);
    rect.setAttribute("stroke-width", toPx(SELECTED_BORDER_WIDTH));
    rect.setAttribute("width", toPx(SELECTED_BORDER_POINTS_SIDELENGTH));
    rect.setAttribute("height", toPx(SELECTED_BORDER_POINTS_SIDELENGTH));
    rect.setAttribute("style", `cursor: ${selectedBorderLineCursor[index]}`);
    rect.setAttribute("data-direction", type);
    points.push(rect);
  });

  return [points, lines];
}

function renderSelectedBorder(g: SVGGElement, selected: HTMLElement) {
  const seletedRect = Rect.from(selected);
  selectedBorderLineTypes.forEach((type) => {
    const line = g.getElementsByClassName(`${NODE_CLASS_PREFIX}-selected-border-line-${type}`)[0];
    switch (type) {
      case "left":
        line.setAttribute("x1", String(seletedRect.x));
        line.setAttribute("y1", String(seletedRect.y - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("x2", String(seletedRect.x));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + SELECTED_BORDER_WIDTH / 2));
        break;
      case "right":
        line.setAttribute("x1", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y1", String(seletedRect.y - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + SELECTED_BORDER_WIDTH / 2));
        break;
      case "top":
        line.setAttribute("x1", String(seletedRect.x - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y1", String(seletedRect.y));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y2", String(seletedRect.y));
        break;
      case "bottom":
        line.setAttribute("x1", String(seletedRect.x - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y1", String(seletedRect.y + seletedRect.h));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        break;
    }
  });
  selectedBorderPointTypes.forEach((type, index) => {
    const rect = g.getElementsByClassName(`${NODE_CLASS_PREFIX}-selected-border-point-${type}`)[0];
    rect.setAttribute("data-owner-id", selected.dataset.id!);
    // 往左上角的偏移量，为边长的一半
    const offset = SELECTED_BORDER_POINTS_SIDELENGTH / 2;
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

export class SeletedBorder {
  g: SVGGElement;
  points: SVGRectElement[];
  lines: SVGLineElement[];

  constructor(svg: SVGSVGElement) {
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-seleted-border`);
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
