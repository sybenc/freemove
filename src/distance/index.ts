import { NODE_CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { createElementNS, epsilonEqual, getElement, showNumber, toPx } from "../utils";
import { DISTANCE_COLOR, DISTANCE_FONT_SIZE, DISTANCE_MAX_LENGTH, DISTANCE_WIDTH } from "./const";
import { DistanceType } from "./type";

const distanceTypes: DistanceType[] = ["left", "right", "top", "bottom"];

function searchDistanceLine(store: Store) {
  const nodeRects: Rect[] = [];
  const seletedRect = Rect.from(store.selected!);
  // 获取节点参数
  store.nodes.forEach((node) => {
    const nodeRect = Rect.from(node);
    nodeRects.push(nodeRect);
  });

  // 初始化活动矩形
  nodeRects.forEach((nodeRect) => {
    const isInline =
      (nodeRect.y <= seletedRect.y && nodeRect.y + nodeRect.h >= seletedRect.y) ||
      (nodeRect.y <= seletedRect.y + seletedRect.h / 2 &&
        nodeRect.y + nodeRect.h >= seletedRect.y + seletedRect.h / 2) ||
      (nodeRect.y <= seletedRect.y + seletedRect.h && nodeRect.y + nodeRect.h >= seletedRect.y + seletedRect.h);
    if (isInline) {
      // 寻找最近的矩形，间距吸附要根据最近的矩形判断
      if (seletedRect.x + seletedRect.w < nodeRect.x) {
        const currDistance = Math.abs(seletedRect.x + seletedRect.w - nodeRect.x);
        if (store.distance.right.length > currDistance) {
          store.distance.right.length = currDistance;
          store.distance.right.node = nodeRect.node;
        }
      }
      if (seletedRect.x > nodeRect.x + nodeRect.w) {
        const currDistance = Math.abs(seletedRect.x - nodeRect.x - nodeRect.w);
        if (store.distance.left.length > currDistance) {
          store.distance.left.length = currDistance;
          store.distance.left.node = nodeRect.node;
        }
      }
    }
  });

  // 初始化活动矩形
  nodeRects.forEach((nodeRect) => {
    const isActive =
      (nodeRect.x <= seletedRect.x && nodeRect.x + nodeRect.w >= seletedRect.x) ||
      (nodeRect.x <= seletedRect.x + seletedRect.w / 2 &&
        nodeRect.x + nodeRect.w >= seletedRect.x + seletedRect.w / 2) ||
      (nodeRect.x <= seletedRect.x + seletedRect.w && nodeRect.x + nodeRect.w >= seletedRect.x + seletedRect.w);
    if (isActive) {
      // 寻找最近的矩形，间距吸附要根据最近的矩形判断
      if (seletedRect.y + seletedRect.h < nodeRect.y) {
        const currDistance = Math.abs(seletedRect.y + seletedRect.h - nodeRect.y);
        if (store.distance.bottom.length > currDistance) {
          store.distance.bottom.length = currDistance;
          store.distance.bottom.node = nodeRect.node;
        }
      }
      if (seletedRect.y > nodeRect.y + nodeRect.h) {
        const currDistance = Math.abs(seletedRect.y - nodeRect.y - nodeRect.h);
        if (store.distance.top.length > currDistance) {
          store.distance.top.length = currDistance;
          store.distance.top.node = nodeRect.node;
        }
      }
    }
  });
}

function getAbsorbDistance(currLength: number) {
  const absorbPosition = [0, 4, 8, 12, 16];
  for (const position of absorbPosition) {
    if (position - 2 <= currLength && position + 2 >= currLength) return position;
  }
  return currLength;
}

export class Distance {
  g: SVGGElement;
  lines: Record<DistanceType, SVGGElement>;
  left: {
    length: number;
    node: HTMLElement | null;
  };
  right: {
    length: number;
    node: HTMLElement | null;
  };
  top: {
    length: number;
    node: HTMLElement | null;
  };
  bottom: {
    length: number;
    node: HTMLElement | null;
  };

  constructor(svg: SVGSVGElement) {
    this.g = createElementNS<SVGGElement>("g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-distance`);
    this.lines = {} as Record<DistanceType, SVGGElement>;

    const createGroup = (direction: DistanceType) => {
      const group = createElementNS<SVGGElement>("g");
      group.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}`);

      const line = createElementNS<SVGLineElement>("line");
      line.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}-line`);

      const dashLine = createElementNS<SVGLineElement>("line");
      dashLine.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}-dash-line`);

      const text = createElementNS<SVGTextElement>("text");
      text.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}-text`);

      const textBg = createElementNS<SVGRectElement>("rect");
      textBg.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}-text-bg`);

      const startRect = createElementNS<SVGRectElement>("rect");
      startRect.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}-line-start`);

      const endRect = createElementNS<SVGRectElement>("rect");
      endRect.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-${direction}-line-end`);

      group.appendChild(line);
      group.appendChild(dashLine);
      group.appendChild(textBg);
      group.appendChild(text);
      group.appendChild(startRect);
      group.appendChild(endRect);

      return group;
    };

    this.left = {
      length: Infinity,
      node: null,
    };
    this.right = {
      length: Infinity,
      node: null,
    };
    this.top = {
      length: Infinity,
      node: null,
    };
    this.bottom = {
      length: Infinity,
      node: null,
    };

    distanceTypes.forEach((type) => {
      const group = createGroup(type);
      this.lines[type] = group;
    });

    this.g.append(...Object.values(this.lines));
    svg.append(this.g);
  }

  hidden() {
    Object.values(this.lines).forEach((group) => {
      group.setAttribute("style", "display: none;");
    });
    this.left = {
      length: Infinity,
      node: null,
    };
    this.right = {
      length: Infinity,
      node: null,
    };
    this.top = {
      length: Infinity,
      node: null,
    };
    this.bottom = {
      length: Infinity,
      node: null,
    };
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.hidden();
    searchDistanceLine(store);

    // Handle left distance
    if (this.left.node && this.left.node.id !== store.selected.dataset.id) {
      if (store.align.isHAlign) {
        const absorbDistance = getAbsorbDistance(this.left.length);
        if (absorbDistance !== this.left.length) {
          store.selected.style.left = toPx(parseFloat(store.selected.style.left) - this.left.length + absorbDistance);
          this.left.length = absorbDistance;
          store.align.reRender(store);
          store.border.reRender(store);
        }
      }
      const nodeRect = Rect.from(this.left.node);
      const seletedRect = Rect.from(store.selected);
      // 主线（水平距离线）
      const line = getElement<SVGLineElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-line`);
      line.setAttribute("x1", String(nodeRect.x + nodeRect.w));
      line.setAttribute("x2", String(seletedRect.x));
      line.setAttribute("y1", String(seletedRect.y + seletedRect.h / 2));
      line.setAttribute("y2", String(seletedRect.y + seletedRect.h / 2));
      line.setAttribute("stroke", DISTANCE_COLOR);
      line.setAttribute("stroke-width", String(DISTANCE_WIDTH));

      // 距离文本
      const text = getElement<SVGTextElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-text`);
      text.textContent = `${showNumber(this.left.length, true)}`;
      text.setAttribute("x", String((nodeRect.x + nodeRect.w + seletedRect.x) / 2));
      text.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - 9));
      text.setAttribute("fill", "#FFFFFF");
      text.setAttribute("font-size", String(DISTANCE_FONT_SIZE));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");

      // 文本背景
      const textBg = getElement<SVGRectElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-text-bg`);
      textBg.setAttribute(
        "x",
        String((nodeRect.x + nodeRect.w + seletedRect.x) / 2 - (text.getComputedTextLength() + 10) / 2)
      );
      textBg.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - DISTANCE_FONT_SIZE / 2 - 12));
      textBg.setAttribute("width", String(text.getComputedTextLength() + 10));
      textBg.setAttribute("height", String(DISTANCE_FONT_SIZE + 4));
      textBg.setAttribute("fill", DISTANCE_COLOR);
      textBg.setAttribute("rx", "4");
      textBg.setAttribute("ry", "4");

      // 起点矩形
      const rectWidth = 1;
      const rectHeight = 8;
      const lineStart = getElement<SVGRectElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-line-start`);
      lineStart.setAttribute("x", String(nodeRect.x + nodeRect.w - rectWidth / 2));
      lineStart.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - rectHeight / 2));
      lineStart.setAttribute("width", String(rectWidth));
      lineStart.setAttribute("height", String(rectHeight));
      lineStart.setAttribute("fill", DISTANCE_COLOR);

      // 终点矩形
      const lineEnd = getElement<SVGRectElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-line-end`);
      lineEnd.setAttribute("x", String(seletedRect.x - rectWidth / 2));
      lineEnd.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - rectHeight / 2));
      lineEnd.setAttribute("width", String(rectWidth));
      lineEnd.setAttribute("height", String(rectHeight));
      lineEnd.setAttribute("fill", DISTANCE_COLOR);

      // 虚线（辅助线）
      const lineDash = getElement<SVGLineElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-dash-line`);
      if (seletedRect.y < nodeRect.y) {
        lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
        lineDash.setAttribute("x2", String(nodeRect.x + nodeRect.w));
        lineDash.setAttribute("y1", String(seletedRect.y));
        lineDash.setAttribute("y2", String(nodeRect.y));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else if (seletedRect.y + seletedRect.h > nodeRect.y + nodeRect.h) {
        lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
        lineDash.setAttribute("x2", String(nodeRect.x + nodeRect.w));
        lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
        lineDash.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else {
        lineDash.setAttribute("style", "display: none;");
      }
    }

    // Handle right distance
    if (this.right.node && this.right.node.id !== store.selected.dataset.id) {
      if (store.align.isHAlign) {
        const absorbDistance = getAbsorbDistance(this.right.length);
        if (absorbDistance !== this.right.length) {
          store.selected.style.left = toPx(parseFloat(store.selected.style.left) + this.right.length - absorbDistance);
          this.right.length = absorbDistance;
          store.align.reRender(store);
          store.border.reRender(store);
        }
      }
      const nodeRect = Rect.from(this.right.node);
      const seletedRect = Rect.from(store.selected);
      // 主线（水平距离线）
      const line = getElement<SVGLineElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-line`);
      line.setAttribute("x1", String(seletedRect.x + seletedRect.w));
      line.setAttribute("x2", String(nodeRect.x));
      line.setAttribute("y1", String(seletedRect.y + seletedRect.h / 2));
      line.setAttribute("y2", String(seletedRect.y + seletedRect.h / 2));
      line.setAttribute("stroke", DISTANCE_COLOR);
      line.setAttribute("stroke-width", String(DISTANCE_WIDTH));

      // 距离文本
      const text = getElement<SVGTextElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-text`);
      text.textContent = `${showNumber(this.right.length, true)}`;
      text.setAttribute("x", String((seletedRect.x + seletedRect.w + nodeRect.x) / 2));
      text.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - 9));
      text.setAttribute("fill", "#FFFFFF");
      text.setAttribute("font-size", String(DISTANCE_FONT_SIZE));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");

      // 文本背景
      const textBg = getElement<SVGRectElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-text-bg`);
      textBg.setAttribute(
        "x",
        String((seletedRect.x + seletedRect.w + nodeRect.x) / 2 - (text.getComputedTextLength() + 10) / 2)
      );
      textBg.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - DISTANCE_FONT_SIZE / 2 - 12));
      textBg.setAttribute("width", String(text.getComputedTextLength() + 10));
      textBg.setAttribute("height", String(DISTANCE_FONT_SIZE + 4));
      textBg.setAttribute("fill", DISTANCE_COLOR);
      textBg.setAttribute("rx", "4");
      textBg.setAttribute("ry", "4");

      // 起点矩形
      const rectWidth = 1;
      const rectHeight = 8;
      const lineStart = getElement<SVGRectElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-line-start`);
      lineStart.setAttribute("x", String(seletedRect.x + seletedRect.w - rectWidth / 2));
      lineStart.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - rectHeight / 2));
      lineStart.setAttribute("width", String(rectWidth));
      lineStart.setAttribute("height", String(rectHeight));
      lineStart.setAttribute("fill", DISTANCE_COLOR);

      // 终点矩形
      const lineEnd = getElement<SVGRectElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-line-end`);
      lineEnd.setAttribute("x", String(nodeRect.x - rectWidth / 2));
      lineEnd.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - rectHeight / 2));
      lineEnd.setAttribute("width", String(rectWidth));
      lineEnd.setAttribute("height", String(rectHeight));
      lineEnd.setAttribute("fill", DISTANCE_COLOR);

      // 虚线（辅助线）
      const lineDash = getElement<SVGLineElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-dash-line`);
      if (seletedRect.y < nodeRect.y) {
        lineDash.setAttribute("x1", String(nodeRect.x));
        lineDash.setAttribute("x2", String(nodeRect.x));
        lineDash.setAttribute("y1", String(seletedRect.y));
        lineDash.setAttribute("y2", String(nodeRect.y));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else if (seletedRect.y + seletedRect.h > nodeRect.y + nodeRect.h) {
        lineDash.setAttribute("x1", String(nodeRect.x));
        lineDash.setAttribute("x2", String(nodeRect.x));
        lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
        lineDash.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else {
        lineDash.setAttribute("style", "display: none;");
      }
    }

    // Handle top distance
    if (this.top.node && this.top.node.id !== store.selected.dataset.id) {
      if (store.align.isVAlign) {
        const absorbDistance = getAbsorbDistance(this.top.length);
        if (absorbDistance !== this.top.length) {
          store.selected.style.top = toPx(parseFloat(store.selected.style.top) - this.top.length + absorbDistance);
          this.top.length = absorbDistance;
          store.border.reRender(store);
        }
      }
      const nodeRect = Rect.from(this.top.node);
      const seletedRect = Rect.from(store.selected);
      // 主线（水平距离线）
      const line = getElement<SVGLineElement>(this.lines.top, `${NODE_CLASS_PREFIX}-distance-top-line`);
      line.setAttribute("x1", String(seletedRect.x + seletedRect.w / 2));
      line.setAttribute("x2", String(seletedRect.x + seletedRect.w / 2));
      line.setAttribute("y1", String(seletedRect.y));
      line.setAttribute("y2", String(nodeRect.y + nodeRect.h));
      line.setAttribute("stroke", DISTANCE_COLOR);
      line.setAttribute("stroke-width", String(DISTANCE_WIDTH));

      // 距离文本
      const text = getElement<SVGTextElement>(this.lines.top, `${NODE_CLASS_PREFIX}-distance-top-text`);
      text.textContent = `${showNumber(this.top.length, true)}`;
      text.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 + (text.getComputedTextLength() + 10) / 2 + 3));
      text.setAttribute("y", String((seletedRect.y + nodeRect.y + nodeRect.h) / 2 + 1));
      text.setAttribute("fill", "#FFFFFF");
      text.setAttribute("font-size", String(DISTANCE_FONT_SIZE));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");

      // 文本背景
      const textBg = getElement<SVGRectElement>(this.lines.top, `${NODE_CLASS_PREFIX}-distance-top-text-bg`);
      textBg.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 + 3));
      textBg.setAttribute("y", String((seletedRect.y + nodeRect.y + nodeRect.h) / 2 - (DISTANCE_FONT_SIZE + 4) / 2));
      textBg.setAttribute("width", String(text.getComputedTextLength() + 10));
      textBg.setAttribute("height", String(DISTANCE_FONT_SIZE + 4));
      textBg.setAttribute("fill", DISTANCE_COLOR);
      textBg.setAttribute("rx", "4");
      textBg.setAttribute("ry", "4");

      // 起点矩形
      const rectWidth = 8;
      const rectHeight = 1;
      const lineStart = getElement<SVGRectElement>(this.lines.top, `${NODE_CLASS_PREFIX}-distance-top-line-start`);
      lineStart.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - rectWidth / 2));
      lineStart.setAttribute("y", String(nodeRect.y + nodeRect.h - rectHeight / 2));
      lineStart.setAttribute("width", String(rectWidth));
      lineStart.setAttribute("height", String(rectHeight));
      lineStart.setAttribute("fill", DISTANCE_COLOR);

      // 终点矩形
      const lineEnd = getElement<SVGRectElement>(this.lines.top, `${NODE_CLASS_PREFIX}-distance-top-line-end`);
      lineEnd.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - rectWidth / 2));
      lineEnd.setAttribute("y", String(seletedRect.y - rectHeight / 2));
      lineEnd.setAttribute("width", String(rectWidth));
      lineEnd.setAttribute("height", String(rectHeight));
      lineEnd.setAttribute("fill", DISTANCE_COLOR);

      // 虚线（辅助线）
      const lineDash = getElement<SVGLineElement>(this.lines.top, `${NODE_CLASS_PREFIX}-distance-top-dash-line`);
      if (seletedRect.x < nodeRect.x) {
        lineDash.setAttribute("x1", String(seletedRect.x));
        lineDash.setAttribute("x2", String(nodeRect.x));
        lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
        lineDash.setAttribute("y2", String(nodeRect.y + nodeRect.h));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else if (seletedRect.x + seletedRect.w > nodeRect.x + nodeRect.w) {
        lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
        lineDash.setAttribute("x2", String(seletedRect.x + seletedRect.w));
        lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
        lineDash.setAttribute("y2", String(nodeRect.y + nodeRect.h));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else {
        lineDash.setAttribute("style", "display: none;");
      }
    }

    // Handle bottom distance
    if (this.bottom.node && this.bottom.node.id !== store.selected.dataset.id) {
      if (store.align.isVAlign) {
        const absorbDistance = getAbsorbDistance(this.bottom.length);
        if (absorbDistance !== this.bottom.length) {
          store.selected.style.top = toPx(parseFloat(store.selected.style.top) + this.bottom.length - absorbDistance);
          this.bottom.length = absorbDistance;
          store.border.reRender(store);
        }
      }
      const nodeRect = Rect.from(this.bottom.node);
      const seletedRect = Rect.from(store.selected);
      // 主线（垂直距离线）
      const line = getElement<SVGLineElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-line`);
      line.setAttribute("x1", String(seletedRect.x + seletedRect.w / 2));
      line.setAttribute("x2", String(seletedRect.x + seletedRect.w / 2));
      line.setAttribute("y1", String(seletedRect.y + seletedRect.h));
      line.setAttribute("y2", String(nodeRect.y));
      line.setAttribute("stroke", DISTANCE_COLOR);
      line.setAttribute("stroke-width", String(DISTANCE_WIDTH));

      // 距离文本
      const text = getElement<SVGTextElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-text`);
      text.textContent = `${showNumber(this.bottom.length, true)}`;
      const textX = seletedRect.x + seletedRect.w / 2 + (text.getComputedTextLength() + 10) / 2 + 3;
      text.setAttribute("x", String(textX));
      text.setAttribute("y", String((seletedRect.y + seletedRect.h + nodeRect.y) / 2 + 1));
      text.setAttribute("fill", "#FFFFFF");
      text.setAttribute("font-size", String(DISTANCE_FONT_SIZE));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");

      // 文本背景
      const textBg = getElement<SVGRectElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-text-bg`);
      textBg.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 + 3));
      textBg.setAttribute("y", String((seletedRect.y + seletedRect.h + nodeRect.y) / 2 - (DISTANCE_FONT_SIZE + 4) / 2));
      textBg.setAttribute("width", String(text.getComputedTextLength() + 10));
      textBg.setAttribute("height", String(DISTANCE_FONT_SIZE + 4));
      textBg.setAttribute("fill", DISTANCE_COLOR);
      textBg.setAttribute("rx", "4");
      textBg.setAttribute("ry", "4");

      // 起点矩形
      const rectWidth = 8;
      const rectHeight = 1;
      const lineStart = getElement<SVGRectElement>(
        this.lines.bottom,
        `${NODE_CLASS_PREFIX}-distance-bottom-line-start`
      );
      lineStart.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - rectWidth / 2));
      lineStart.setAttribute("y", String(seletedRect.y + seletedRect.h - rectHeight / 2));
      lineStart.setAttribute("width", String(rectWidth));
      lineStart.setAttribute("height", String(rectHeight));
      lineStart.setAttribute("fill", DISTANCE_COLOR);

      // 终点矩形
      const lineEnd = getElement<SVGRectElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-line-end`);
      lineEnd.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - rectWidth / 2));
      lineEnd.setAttribute("y", String(nodeRect.y - rectHeight / 2));
      lineEnd.setAttribute("width", String(rectWidth));
      lineEnd.setAttribute("height", String(rectHeight));
      lineEnd.setAttribute("fill", DISTANCE_COLOR);

      // 虚线（辅助线）
      const lineDash = getElement<SVGLineElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-dash-line`);
      if (seletedRect.x < nodeRect.x) {
        lineDash.setAttribute("x1", String(seletedRect.x));
        lineDash.setAttribute("x2", String(nodeRect.x));
        lineDash.setAttribute("y1", String(nodeRect.y));
        lineDash.setAttribute("y2", String(nodeRect.y));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else if (seletedRect.x + seletedRect.w > nodeRect.x + nodeRect.w) {
        lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
        lineDash.setAttribute("x2", String(seletedRect.x + seletedRect.w));
        lineDash.setAttribute("y1", String(nodeRect.y));
        lineDash.setAttribute("y2", String(nodeRect.y));
        lineDash.setAttribute("stroke", DISTANCE_COLOR);
        lineDash.setAttribute("stroke-width", "1");
        lineDash.setAttribute("stroke-dasharray", "4 4");
        lineDash.setAttribute("style", "display: block;");
      } else {
        lineDash.setAttribute("style", "display: none;");
      }
    }

    if (store.align.isHAlign) {
      if (epsilonEqual(this.left.length, this.right.length)) {
        this.lines.left.style = "display: block;";
        this.lines.right.style = "display: block;";
      } else if (this.left.length > this.right.length) {
        this.lines.right.style = "display: block;";
      } else {
        this.lines.left.style = "display: block;";
      }
    }
    if (store.align.isVAlign) {
      if (epsilonEqual(this.top.length, this.bottom.length)) {
        this.lines.top.style = "display: block;";
        this.lines.bottom.style = "display: block;";
      } else if (this.top.length > this.bottom.length) {
        this.lines.bottom.style = "display: block;";
      } else {
        this.lines.top.style = "display: block;";
      }
    }
  }
}
