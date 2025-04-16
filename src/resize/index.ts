import { Store } from "./../store";
import { NODE_ABSORB_DELTA, NODE_CLASS_PREFIX, NODE_MIN_HEIGHT, NODE_MIN_WIDTH } from "../const";
import Rect from "../rect";
import { epsilonEqual, getElement, toPx } from "../utils";
import { ResizeData } from "./type";
import { RESIZE_COLOR, RESIZE_OFFSET, RESIZE_WIDTH } from "./const";

// 搜索相同宽高的数据映射
function searchSameWidthHeight(store: Store): {
  widthMap: Map<number, ResizeData[]>;
  heightMap: Map<number, ResizeData[]>;
} {
  const nodeRects = store.nodes.map((item) => Rect.from(item));
  const widthMap = new Map<number, ResizeData[]>();
  const heightMap = new Map<number, ResizeData[]>();
  nodeRects.forEach((nodeRect) => {
    const resizeWidthData: ResizeData = {
      type: "width",
      nodeRect: nodeRect,
    };
    const resizeHeightData: ResizeData = {
      type: "height",
      nodeRect: nodeRect,
    };
    if (widthMap.has(nodeRect.w)) {
      widthMap.get(nodeRect.w)?.push(resizeWidthData);
    } else {
      widthMap.set(nodeRect.w, [resizeWidthData]);
    }
    if (heightMap.has(nodeRect.h)) {
      heightMap.get(nodeRect.h)?.push(resizeHeightData);
    } else {
      heightMap.set(nodeRect.h, [resizeHeightData]);
    }
  });
  return {
    widthMap,
    heightMap,
  };
}

function renderResizeLine(store: Store) {
  store.nodes.forEach((node) => {
    const nodeRect = Rect.from(node);
    const g = store.resize.g.querySelector(`[data-ower-id="${nodeRect.id}"]`)!;
    const widthLine = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line`);
    const heightLine = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);

    widthLine.setAttribute("x1", String(nodeRect.x));
    widthLine.setAttribute("y1", String(nodeRect.y - RESIZE_OFFSET));
    widthLine.setAttribute("x2", String(nodeRect.x + nodeRect.w));
    widthLine.setAttribute("y2", String(nodeRect.y - RESIZE_OFFSET));
    heightLine.setAttribute("x1", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y1", String(nodeRect.y));
    heightLine.setAttribute("x2", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y2", String(nodeRect.y + nodeRect.h));

    [widthLine, heightLine].forEach((line) => {
      line.setAttribute("stroke", RESIZE_COLOR);
      line.setAttribute("stroke-width", String(RESIZE_WIDTH));
    });
  });
}

export class Resize {
  g: SVGGElement;
  lines: SVGGElement[];
  constructor(svg: SVGSVGElement, nodes: HTMLElement[]) {
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-resize`);
    const result: SVGGElement[] = [];
    nodes.forEach((node) => {
      const nodeRect = Rect.from(node);

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line`);
      g.setAttribute("data-ower-id", nodeRect.id);
      const widthGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const widthLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const widthLineText = document.createElementNS("http://www.w3.org/2000/svg", "text");

      const heightGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const heightLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const heightLineText = document.createElementNS("http://www.w3.org/2000/svg", "text");

      widthGroup.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width`);
      widthLine.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-line`);
      widthLineText.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-text`);
      widthGroup.append(widthLine);

      heightGroup.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height`);
      heightLine.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);
      heightLineText.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-text`);
      heightGroup.append(heightLine);

      g.append(heightGroup, widthGroup);

      result.push(g);
    });
    this.lines = result;
    this.g.append(...this.lines);
    svg.append(this.g);
    this.hidden();
  }

  hidden() {
    this.lines.forEach((lineGroup) => {
      Array.from(lineGroup.children).forEach((item) => {
        item.setAttribute("style", "display: none");
      });
    });
  }

  reRender(
    store: Store,
    newWidth: number,
    newHeight: number,
    direction: string,
    startLeft: number,
    startTop: number,
    startWidth: number,
    startHeight: number
  ) {
    if (!store.selected) return;
    this.hidden();
  
    // Find absorbing sizes
    const { widthMap, heightMap } = searchSameWidthHeight(store);
    const alternateAbsorbWidth: number[] = [];
    const alternateAbsorbHeight: number[] = [];
  
    widthMap.forEach((value, key) => {
      if (value.length === 1) {
        if(value[0].nodeRect.id === store.selected?.dataset.id)
          return
      }
      if (Math.abs(newWidth - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbWidth.push(key);
      }
    });
    heightMap.forEach((value, key) => {
      if (value.length === 1) {
        if(value[0].nodeRect.id === store.selected?.dataset.id)
          return
      }
      if (Math.abs(newHeight - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbHeight.push(key);
      }
    });
    // debugger
    const absorbWidth = alternateAbsorbWidth.length === 0 ? newWidth : Math.max(...alternateAbsorbWidth);
    const absorbHeight = alternateAbsorbHeight.length === 0 ? newHeight : Math.max(...alternateAbsorbHeight);
  
    // Enforce minimum size
    const finalWidth = Math.max(absorbWidth, NODE_MIN_WIDTH);
    const finalHeight = Math.max(absorbHeight, NODE_MIN_HEIGHT);
  
    // Set size and position based on direction
    if (direction.includes("left")) {
      const rightEdge = startLeft + startWidth; // Right edge remains fixed
      store.selected.style.left = toPx(rightEdge - finalWidth);
    } else {
      store.selected.style.left = toPx(startLeft); // Left edge fixed for right/bottom resizes
    }
    store.selected.style.width = toPx(finalWidth);
  
    if (direction.includes("top")) {
      const bottomEdge = startTop + startHeight; // Bottom edge remains fixed
      store.selected.style.top = toPx(bottomEdge - finalHeight);
    } else {
      store.selected.style.top = toPx(startTop); // Top edge fixed for bottom/right resizes
    }
    store.selected.style.height = toPx(finalHeight);
  
    // Update resize lines based on final size
    const currentWidth = parseFloat(store.selected.style.width);
    const currentHeight = parseFloat(store.selected.style.height);
    console.log(widthMap, finalWidth, newWidth, absorbWidth)

    const { widthMap: newWidthMap, heightMap: newHeightMap } = searchSameWidthHeight(store);
  
    newWidthMap.get(currentWidth)?.forEach((item) => {
      if (item.nodeRect.id !== store.selected!.dataset.ownerId) {
        const lineGroup = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`)!;
        const widthLine = getElement(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-width`);
        widthLine.style.display = "block";
      }
    });
  
    newHeightMap.get(currentHeight)?.forEach((item) => {
      if (item.nodeRect.id !== store.selected!.dataset.ownerId) {
        const lineGroup = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`)!;
        const heightLine = getElement(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-height`);
        heightLine.style.display = "block";
      }
    });
  
    renderResizeLine(store);
    store.seletedBorder.reRender(store);
  }
}
