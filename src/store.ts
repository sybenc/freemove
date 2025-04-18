import { Gap } from './gap/index';
import { nanoid } from "nanoid";
import { AlignLine } from "./align-line";
import { NODE_CLASS_PREFIX } from "./const";
import { SeletedBorder } from "./selected-border";
import { toPx } from "./utils";
import { Resize } from "./resize";
import { Selector } from "./selector";

export interface Store {
  container: HTMLElement;
  nodes: HTMLElement[];
  selected: HTMLElement | null;
  svg: SVGSVGElement;
  alignLine: AlignLine;
  seletedBorder: SeletedBorder;
  resize: Resize;
  selector: Selector;
  gap: Gap
  setSelected: (target: HTMLElement | null) => void;
}

export const initStore = (container: HTMLElement, nodes: HTMLElement[]): Store => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", `${NODE_CLASS_PREFIX}-svg`);

  const containerRect = container.getBoundingClientRect();
  // this.render(config.nodes);
  svg.setAttribute("width", toPx(containerRect.width));
  svg.setAttribute("height", toPx(containerRect.height));
  svg.style = "position: absolute; inset: 0;";
  container.className += ` ${NODE_CLASS_PREFIX}-container`;
  nodes.forEach((node) => {
    node.className += ` ${NODE_CLASS_PREFIX}-movable-node`;
    node.setAttribute('data-id', nanoid())
    if (/%$/.test(node.style.x)) node.style.x = toPx((containerRect.width * parseInt(node.style.x)) / 100);
    if (/%$/.test(node.style.y)) node.style.y = toPx((containerRect.height * parseInt(node.style.y)) / 100);
    if (/%$/.test(node.style.width)) node.style.width = toPx((containerRect.width * parseInt(node.style.width)) / 100);
    if (/%$/.test(node.style.height)) node.style.height = toPx((containerRect.height * parseInt(node.style.height)) / 100);
  });

  return {
    container,
    nodes,
    svg,
    selected: null,
    alignLine: new AlignLine(svg),
    seletedBorder: new SeletedBorder(svg),
    resize: new Resize(svg, nodes),
    selector: new Selector(svg),
    gap: new Gap(svg),
    setSelected(target: HTMLElement | null) {
      this.selected = target;
      if (!target) {
        this.seletedBorder.hidden();
        return;
      }
      this.seletedBorder.reRender(this);
      // console.log(this.seletedBorder);
    },
  };
};
