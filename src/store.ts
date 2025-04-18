import { Gap } from "./gap/index";
import { nanoid } from "nanoid";
import { Align } from "./align";
import { NODE_CLASS_PREFIX } from "./const";
import { Border } from "./border";
import { createElementNS, toPx } from "./utils";
import { Resize } from "./resize";
import { Selector } from "./selector";
import { Distance } from "./distance";

export interface Store {
  container: HTMLElement;
  nodes: HTMLElement[];
  svg: SVGSVGElement;
  selected: HTMLElement | null;
  setSelected: (target: HTMLElement | null) => void;

  align: Align;
  distance: Distance;
  border: Border;
  resize: Resize;
  selector: Selector;
  gap: Gap;
}

export const initStore = (container: HTMLElement, nodes: HTMLElement[]): Store => {
  const svg = createElementNS<SVGSVGElement>("svg");
  svg.setAttribute("class", `${NODE_CLASS_PREFIX}-svg`);

  const containerRect = container.getBoundingClientRect();
  // this.render(config.nodes);
  svg.setAttribute("width", toPx(containerRect.width));
  svg.setAttribute("height", toPx(containerRect.height));
  svg.style = "position: absolute; inset: 0;";
  container.className += ` ${NODE_CLASS_PREFIX}-container`;
  nodes.forEach((node) => {
    node.className += ` ${NODE_CLASS_PREFIX}-movable-node`;
    node.setAttribute("data-id", nanoid());
    if (/%$/.test(node.style.top)) node.style.top = toPx((containerRect.width * parseFloat(node.style.top)) / 100);
    if (/%$/.test(node.style.left)) node.style.left = toPx((containerRect.height * parseFloat(node.style.left)) / 100);
    if (/%$/.test(node.style.width))
      node.style.width = toPx((containerRect.width * parseFloat(node.style.width)) / 100);
    if (/%$/.test(node.style.height))
      node.style.height = toPx((containerRect.height * parseFloat(node.style.height)) / 100);
  });

  return {
    container,
    nodes,
    svg,
    selected: null,
    setSelected(target: HTMLElement | null) {
      this.selected = target;
      if (!target) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this);
    },

    align: new Align(svg),
    distance: new Distance(svg),
    border: new Border(svg),
    resize: new Resize(svg, nodes),
    selector: new Selector(svg),
    gap: new Gap(svg),
  };
};
