import { AlignLine } from "./align-line";
import { toPx } from "./utils";

export interface Store {
  container: HTMLElement;
  nodes: HTMLElement[];
  selected: HTMLElement | null;
  svg: SVGSVGElement;
  alignLine: AlignLine;
  setSelected: (target: HTMLElement | null) => void;
}


export const initStore = (
  container: HTMLElement,
  nodes: HTMLElement[]
): Store => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "__freemove-svg");

  const containerRect = container.getBoundingClientRect()
  // this.render(config.nodes);
  svg.setAttribute("width", toPx(containerRect.width));
  svg.setAttribute("height", toPx(containerRect.height));
  svg.style = "position: absolute; inset: 0;";
  container.className += " __freemove-container";
  nodes.forEach((node) => (node.className += " __freemove-movable-node"));

  return {
    container,
    nodes,
    svg,
    selected: null,
    alignLine: new AlignLine(svg),
    setSelected(target: HTMLElement | null) {
      this.selected = target;
      if (!target) return;
      // const targetRect = Rect.from(target);
      // this.alignLine.reRender(targetRect);
    },
  };
};
