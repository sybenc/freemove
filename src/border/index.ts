import { NodeClassPrefix } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { createElementNS, getElement, toPx } from "../utils";
import { BorderColor, BorderPointsSideLength, BorderWidth } from "./const";
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
    const line = createElementNS<SVGLineElement>("line");
    line.setAttribute("class", `${NodeClassPrefix}-border-line-${type}`);
    line.setAttribute("stroke", BorderColor);
    lines.push(line);
  });

  selectedBorderPointTypes.forEach((type, index) => {
    const rect = createElementNS<SVGRectElement>("rect");
    rect.setAttribute("class", `${NodeClassPrefix}-border-point-${type}`);
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", BorderColor);
    rect.setAttribute("style", `cursor: ${selectedBorderLineCursor[index]}`);
    rect.setAttribute("data-direction", type);
    points.push(rect);
  });

  return [points, lines];
}

function renderSelectedBorder(g: SVGGElement, store: Store) {
  const seletedRect = Rect.from(store.selected!);
  selectedBorderLineTypes.forEach((type) => {
    const line = getElement<SVGLineElement>(g, `${NodeClassPrefix}-border-line-${type}`);
    line.setAttribute("stroke-width", toPx(BorderWidth / store.scale));
    switch (type) {
      case "left":
        line.setAttribute("x1", String(seletedRect.x));
        line.setAttribute("y1", String(seletedRect.y - BorderWidth/ store.scale / 2));
        line.setAttribute("x2", String(seletedRect.x));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + BorderWidth/ store.scale / 2));
        break;
      case "right":
        line.setAttribute("x1", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y1", String(seletedRect.y - BorderWidth/ store.scale / 2));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + BorderWidth/ store.scale / 2));
        break;
      case "top":
        line.setAttribute("x1", String(seletedRect.x - BorderWidth/ store.scale / 2));
        line.setAttribute("y1", String(seletedRect.y));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + BorderWidth/ store.scale / 2));
        line.setAttribute("y2", String(seletedRect.y));
        break;
      case "bottom":
        line.setAttribute("x1", String(seletedRect.x - BorderWidth/ store.scale / 2));
        line.setAttribute("y1", String(seletedRect.y + seletedRect.h));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + BorderWidth/ store.scale / 2));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        break;
    }
  });
  selectedBorderPointTypes.forEach((type, index) => {
    const rect = getElement<SVGRectElement>(g, `${NodeClassPrefix}-border-point-${type}`);
    rect.setAttribute("data-owner-id", store.selected!.dataset.id!);
    rect.setAttribute("stroke-width", toPx(BorderWidth / store.scale));
    rect.setAttribute("width", toPx(BorderPointsSideLength / store.scale));
    rect.setAttribute("height", toPx(BorderPointsSideLength / store.scale));
    // 往左上角的偏移量，为边长的一半
    const offset = BorderPointsSideLength / store.scale / 2;
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
    this.g = createElementNS<SVGGElement>("g");
    this.g.setAttribute("class", `${NodeClassPrefix}-border`);
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
    renderSelectedBorder(this.g, store);
  }
}
