import { Store } from "./../store";
import { NODE_ABSORB_DELTA, NODE_CLASS_PREFIX, NODE_MIN_HEIGHT, NODE_MIN_WIDTH } from "../const";
import Rect from "../rect";
import { createElementNS, getElement, showNumber, toPx } from "../utils"; // Ensure createElementNS is imported
import { ResizeData } from "./type";
import { RESIZE_COLOR, RESIZE_ENDPOINT_LENGTH, RESIZE_FONT_SIZE, RESIZE_OFFSET, RESIZE_WIDTH } from "./const";

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
    const widthLine = getElement<SVGLineElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line`);
    const widthLineStart = getElement<SVGRectElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line-start`);
    const widthLineEnd = getElement<SVGRectElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line-end`);
    const widthLineText = getElement<SVGTextElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-text`);
    const heightLine = getElement<SVGLineElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);
    const heightLineText = getElement<SVGTextElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-text`);
    const heightLineStart = getElement<SVGRectElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line-start`);
    const heightLineEnd = getElement<SVGRectElement>(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line-end`);

    widthLine.setAttribute("x1", String(nodeRect.x));
    widthLine.setAttribute("y1", String(nodeRect.y - RESIZE_OFFSET));
    widthLine.setAttribute("x2", String(nodeRect.x + nodeRect.w));
    widthLine.setAttribute("y2", String(nodeRect.y - RESIZE_OFFSET));

    widthLineStart.setAttribute("x", String(nodeRect.x - RESIZE_WIDTH / 2));
    widthLineStart.setAttribute("y", String(nodeRect.y - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    widthLineStart.setAttribute("width", String(RESIZE_WIDTH));
    widthLineStart.setAttribute("height", String(RESIZE_ENDPOINT_LENGTH));
    widthLineStart.setAttribute("fill", String(RESIZE_COLOR));

    widthLineEnd.setAttribute("x", String(nodeRect.x + nodeRect.w - RESIZE_WIDTH / 2));
    widthLineEnd.setAttribute("y", String(nodeRect.y - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    widthLineEnd.setAttribute("width", String(RESIZE_WIDTH));
    widthLineEnd.setAttribute("height", String(RESIZE_ENDPOINT_LENGTH));
    widthLineEnd.setAttribute("fill", String(RESIZE_COLOR));

    widthLineText.textContent = `${showNumber(nodeRect.w)}`;
    widthLineText.setAttribute("x", String(nodeRect.x + nodeRect.w / 2));
    widthLineText.setAttribute("y", String(nodeRect.y - RESIZE_OFFSET - 8));
    widthLineText.setAttribute("fill", String(RESIZE_COLOR));
    widthLineText.setAttribute("font-size", String(RESIZE_FONT_SIZE));
    widthLineText.setAttribute("text-anchor", "middle");
    widthLineText.setAttribute("alignment-baseline", "middle");

    heightLine.setAttribute("x1", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y1", String(nodeRect.y));
    heightLine.setAttribute("x2", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y2", String(nodeRect.y + nodeRect.h));

    heightLineStart.setAttribute("x", String(nodeRect.x - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    heightLineStart.setAttribute("y", String(nodeRect.y - RESIZE_WIDTH / 2));
    heightLineStart.setAttribute("width", String(RESIZE_ENDPOINT_LENGTH));
    heightLineStart.setAttribute("height", String(RESIZE_WIDTH));
    heightLineStart.setAttribute("fill", String(RESIZE_COLOR));

    heightLineEnd.setAttribute("x", String(nodeRect.x - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    heightLineEnd.setAttribute("y", String(nodeRect.y + nodeRect.h - RESIZE_WIDTH / 2));
    heightLineEnd.setAttribute("width", String(RESIZE_ENDPOINT_LENGTH));
    heightLineEnd.setAttribute("height", String(RESIZE_WIDTH));
    heightLineEnd.setAttribute("fill", String(RESIZE_COLOR));

    heightLineText.textContent = `${showNumber(nodeRect.h)}`;
    heightLineText.setAttribute("x", String(nodeRect.x - RESIZE_OFFSET - 8));
    heightLineText.setAttribute("y", String(nodeRect.y + nodeRect.h / 2));
    heightLineText.setAttribute("fill", String(RESIZE_COLOR));
    heightLineText.setAttribute("font-size", String(RESIZE_FONT_SIZE));
    heightLineText.setAttribute("text-anchor", "middle");
    heightLineText.setAttribute("alignment-baseline", "middle");
    heightLineText.setAttribute(
      "transform",
      `rotate(-90 ${nodeRect.x - RESIZE_OFFSET - 8} ${nodeRect.y + nodeRect.h / 2})`
    );

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
    this.g = createElementNS<SVGGElement>("g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-resize`);
    const result: SVGGElement[] = [];
    nodes.forEach((node) => {
      const nodeRect = Rect.from(node);

      const g = createElementNS<SVGGElement>("g");
      g.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line`);
      g.setAttribute("data-ower-id", nodeRect.id);

      // Create width group
      const widthGroup = createElementNS<SVGGElement>("g");
      widthGroup.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width`);

      const widthLine = createElementNS<SVGLineElement>("line");
      widthLine.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-line`);

      const widthLineText = createElementNS<SVGTextElement>("text");
      widthLineText.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-text`);

      const widthLineStart = createElementNS<SVGRectElement>("rect");
      widthLineStart.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-line-start`);

      const widthLineEnd = createElementNS<SVGRectElement>("rect");
      widthLineEnd.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-line-end`);

      widthGroup.append(widthLine, widthLineText, widthLineStart, widthLineEnd);

      // Create height group
      const heightGroup = createElementNS<SVGGElement>("g");
      heightGroup.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height`);

      const heightLine = createElementNS<SVGLineElement>("line");
      heightLine.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);

      const heightLineText = createElementNS<SVGTextElement>("text");
      heightLineText.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-text`);

      const heightLineStart = createElementNS<SVGRectElement>("rect");
      heightLineStart.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-line-start`);

      const heightLineEnd = createElementNS<SVGRectElement>("rect");
      heightLineEnd.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-line-end`);

      heightGroup.append(heightLine, heightLineText, heightLineStart, heightLineEnd);

      g.append(widthGroup, heightGroup);
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
        (item as SVGElement).style.display = "none";
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

    // 查找可吸附的尺寸
    const { widthMap, heightMap } = searchSameWidthHeight(store);
    const alternateAbsorbWidth: number[] = [];
    const alternateAbsorbHeight: number[] = [];

    widthMap.forEach((value, key) => {
      if (value.length === 1) {
        if (value[0].nodeRect.id === store.selected?.dataset.id) return;
      }
      if (Math.abs(newWidth - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbWidth.push(key);
      }
    });
    heightMap.forEach((value, key) => {
      if (value.length === 1) {
        if (value[0].nodeRect.id === store.selected?.dataset.id) return;
      }
      if (Math.abs(newHeight - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbHeight.push(key);
      }
    });

    // 强制最小尺寸
    const absorbWidth = alternateAbsorbWidth.length === 0 ? newWidth : Math.max(...alternateAbsorbWidth);
    const absorbHeight = alternateAbsorbHeight.length === 0 ? newHeight : Math.max(...alternateAbsorbHeight);

    // 根据拖拽方向设置大小和位置
    const finalWidth = Math.max(absorbWidth, NODE_MIN_WIDTH);
    const finalHeight = Math.max(absorbHeight, NODE_MIN_HEIGHT);

    // 保持右边缘不动
    if (direction.includes("left")) {
      const rightEdge = startLeft + startWidth; // 向右或向下拉伸时左边缘固定
      store.selected.style.left = toPx(rightEdge - finalWidth);
    } else {
      store.selected.style.left = toPx(startLeft); // 向右或向下拉伸时左边缘固定
    }
    store.selected.style.width = toPx(finalWidth);

    // 保持下边缘不动
    if (direction.includes("top")) {
      const bottomEdge = startTop + startHeight; // 向右或向下拉伸时上边缘固定
      store.selected.style.top = toPx(bottomEdge - finalHeight);
    } else {
      store.selected.style.top = toPx(startTop); // 向右或向下拉伸时上边缘固定
    }
    store.selected.style.height = toPx(finalHeight);

    // 根据最终尺寸更新辅助线
    const currentWidth = parseFloat(store.selected.style.width);
    const currentHeight = parseFloat(store.selected.style.height);
    // console.log(widthMap, finalWidth, newWidth, absorbWidth)

    const { widthMap: newWidthMap, heightMap: newHeightMap } = searchSameWidthHeight(store);

    newWidthMap.get(currentWidth)?.forEach((item) => {
      const lineGroup = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`)!;
      const widthLine = getElement<SVGLineElement>(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-width`);
      widthLine.style.display = "block";
    });

    newHeightMap.get(currentHeight)?.forEach((item) => {
      const lineGroup = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`)!;
      const heightLine = getElement<SVGLineElement>(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-height`);
      heightLine.style.display = "block";
    });

    // * 确保当前选择的节点宽高一直显示，不加的话safari和chrome显示不一致，不知道原因
    const lineGroup = this.g.querySelector(`[data-ower-id="${store.selected.dataset.id}"]`)!;
    const widthLine = getElement<SVGLineElement>(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-width`);
    const heightLine = getElement<SVGLineElement>(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-height`);
    heightLine.style.display = "block";
    widthLine.style.display = "block";

    renderResizeLine(store);
    store.border.reRender(store);
  }
}