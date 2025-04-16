import { Store } from "./../store";
import { NODE_CLASS_PREFIX } from "../const";
import { Quadrant } from "./type";
import Rect from "../rect";

function getQuadrant(startX: number, startY: number, endX: number, endY: number): Quadrant {
  if (endX - startX > 0 && endY - startY > 0) return "4";
  if (endX - startX < 0 && endY - startY > 0) return "3";
  if (endX - startX < 0 && endY - startY < 0) return "2";
  if (endX - startX > 0 && endY - startY < 0) return "1";
  return "0";
}

export class Selector {
  g: SVGGElement;
  // 选择框矩形
  selectorRect: SVGRectElement;
  previewRect: SVGRectElement;
  selectedGroup: HTMLElement[] = [];

  constructor(svg: SVGSVGElement) {
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-selector`);
    this.selectorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.selectorRect.setAttribute("class", `${NODE_CLASS_PREFIX}-selector-rect`);
    this.selectorRect.setAttribute("stroke", "#919191");
    this.selectorRect.setAttribute("stroke-width", "1px");
    this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)");
    this.selectorRect.style.display = "none";

    this.previewRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.previewRect.setAttribute("class", `${NODE_CLASS_PREFIX}-selector-preview`);
    this.previewRect.setAttribute("stroke", "#000");
    this.previewRect.setAttribute("stroke-width", "1.5px");
    this.previewRect.setAttribute("fill", "transparent");
    this.previewRect.style.display = "none";

    this.g.append(this.selectorRect, this.previewRect);
    svg.append(this.g);
  }

  hiddenSelector() {
    this.selectorRect.style.display = "none";
  }

  hiddenPreview() {
    this.previewRect.style.display = "none";
  }

  reRender(store: Store, startX: number, startY: number, endX: number, endY: number) {
    this.selectorRect.style.display = "block";
    this.selectedGroup = [];
    const quadrant = getQuadrant(startX, startY, endX, endY);
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);
    this.selectorRect.setAttribute("width", String(width));
    this.selectorRect.setAttribute("height", String(height));

    let x = startX;
    let y = startY;

    switch (quadrant) {
      case "3": {
        x = x - width;
        break;
      }
      case "2": {
        x = x - width;
        y = y - height;
        break;
      }
      case "1": {
        y = y - height;
        break;
      }
      default:
        break;
    }

    this.selectorRect.setAttribute("x", String(x));
    this.selectorRect.setAttribute("y", String(y));

    // 将被选中的元素放入selectedGroup中
    store.nodes.forEach((node) => {
      const nodeRect = Rect.from(node);
      if (
        nodeRect.isIntersect({
          x,
          y,
          w: width,
          h: height,
        })
      ) {
        this.selectedGroup.push(node);
      }
    });

    const alternateX1: number[] = [];
    const alternateY1: number[] = [];
    const alternateX2: number[] = [];
    const alternateY2: number[] = [];

    this.selectedGroup.forEach((node) => {
      const { x, y, w, h } = Rect.from(node);
      console.log(Rect.from(node));
      alternateX1.push(x);
      alternateY1.push(y);
      alternateX2.push(x + w);
      alternateY2.push(y + h);
    });

    const x1 = Math.min(...alternateX1);
    const y1 = Math.min(...alternateY1);
    this.previewRect.setAttribute("x", String(alternateX1.length ? x1 : 0));
    this.previewRect.setAttribute("y", String(alternateY1.length ? y1 : 0));
    this.previewRect.setAttribute("width", String(alternateX2.length ? Math.max(...alternateX2) - x1 : 0));
    this.previewRect.setAttribute("height", String(alternateY2.length ? Math.max(...alternateY2) - y1 : 0));
    this.previewRect.style.display = "block";
  }
}
