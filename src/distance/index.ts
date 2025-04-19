import { NODE_CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { createElementNS, getElement, showNumber, toPx } from "../utils";
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
        if (store.distance.x.length > currDistance) {
          store.distance.x.length = currDistance;
          store.distance.x.type = "right";
          store.distance.x.node = nodeRect.node;
        }
      }
      if (seletedRect.x > nodeRect.x + nodeRect.w) {
        const currDistance = Math.abs(seletedRect.x - nodeRect.x - nodeRect.w);
        if (store.distance.x.length > currDistance) {
          store.distance.x.length = currDistance;
          store.distance.x.type = "left";
          store.distance.x.node = nodeRect.node;
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
        if (store.distance.y.length > currDistance) {
          store.distance.y.length = currDistance;
          store.distance.y.type = "bottom";
          store.distance.y.node = nodeRect.node;
        }
      }
      if (seletedRect.y > nodeRect.y + nodeRect.h) {
        const currDistance = Math.abs(seletedRect.y - nodeRect.y - nodeRect.h);
        if (store.distance.y.length > currDistance) {
          store.distance.y.length = currDistance;
          store.distance.y.type = "top";
          store.distance.y.node = nodeRect.node;
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
  x: {
    type: "left" | "right";
    length: number;
    node: HTMLElement | null;
  };
  y: {
    type: "top" | "bottom";
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

    this.x = {
      type: "left",
      length: Infinity,
      node: null,
    };
    this.y = {
      type: "top",
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
    this.x = {
      type: "left",
      length: Infinity,
      node: null,
    };
    this.y = {
      type: "top",
      length: Infinity,
      node: null,
    };
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.hidden();
    searchDistanceLine(store);
    if (this.x.node && this.x.node.id !== store.selected.dataset.id) {
      if (this.x.type === "left") {
        const absorbDistance = getAbsorbDistance(this.x.length);
        if (absorbDistance !== this.x.length) {
          store.selected.style.left = toPx(parseFloat(store.selected.style.left) - this.x.length + absorbDistance);
          this.x.length = absorbDistance;
          store.align.reRender(store);
          store.border.reRender(store);
        }
        const nodeRect = Rect.from(this.x.node);
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
        text.textContent = `${showNumber(this.x.length, true)}`;
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
          // seletedRect 在 nodeRect 上方，绘制上方和下方虚线
          lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
          lineDash.setAttribute("x2", String(nodeRect.x + nodeRect.w));
          lineDash.setAttribute("y1", String(seletedRect.y));
          lineDash.setAttribute("y2", String(nodeRect.y));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4"); // 虚线样式
          lineDash.setAttribute("style", "display: block;");
        } else if (seletedRect.y + seletedRect.h > nodeRect.y + nodeRect.h) {
          // seletedRect 在 nodeRect 下方，绘制下方和上方虚线
          lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
          lineDash.setAttribute("x2", String(nodeRect.x + nodeRect.w));
          lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
          lineDash.setAttribute("y2", String(seletedRect.y + seletedRect.h));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4"); // 虚线样式
          lineDash.setAttribute("style", "display: block;");
        } else {
          // 隐藏虚线
          lineDash.setAttribute("style", "display: none;");
        }
        if (store.align.isHAlign) this.lines.left.setAttribute("style", "display: block;");
      } else if (this.x.type === "right") {
        const absorbDistance = getAbsorbDistance(this.x.length);
        if (absorbDistance !== this.x.length) {
          store.selected.style.left = toPx(parseFloat(store.selected.style.left) + this.x.length - absorbDistance);
          this.x.length = absorbDistance;
          store.align.reRender(store);
          store.border.reRender(store);
        }
        const nodeRect = Rect.from(this.x.node);
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
        text.textContent = `${showNumber(this.x.length, true)}`;
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
        const lineStart = getElement<SVGRectElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-line-start`);
        lineStart.setAttribute("x", String(seletedRect.x + seletedRect.w - rectWidth / 2));
        lineStart.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - rectHeight / 2));
        lineStart.setAttribute("width", String(rectWidth));
        lineStart.setAttribute("height", String(rectHeight));
        lineStart.setAttribute("fill", DISTANCE_COLOR);

        // 终点矩形
        const lineEnd = getElement<SVGRectElement>(this.lines.left, `${NODE_CLASS_PREFIX}-distance-left-line-end`);
        lineEnd.setAttribute("x", String(nodeRect.x - rectWidth / 2));
        lineEnd.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - rectHeight / 2));
        lineEnd.setAttribute("width", String(rectWidth));
        lineEnd.setAttribute("height", String(rectHeight));
        lineEnd.setAttribute("fill", DISTANCE_COLOR);

        // 虚线（辅助线）
        const lineDash = getElement<SVGLineElement>(this.lines.right, `${NODE_CLASS_PREFIX}-distance-right-dash-line`);
        if (seletedRect.y < nodeRect.y) {
          // seletedRect 在 nodeRect 上方，绘制上方和下方虚线
          lineDash.setAttribute("x1", String(nodeRect.x));
          lineDash.setAttribute("x2", String(nodeRect.x));
          lineDash.setAttribute("y1", String(seletedRect.y));
          lineDash.setAttribute("y2", String(nodeRect.y));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4"); // 虚线样式
          lineDash.setAttribute("style", "display: block;");
        } else if (seletedRect.y + seletedRect.h > nodeRect.y + nodeRect.h) {
          // seletedRect 在 nodeRect 下方，绘制下方和上方虚线
          lineDash.setAttribute("x1", String(nodeRect.x));
          lineDash.setAttribute("x2", String(nodeRect.x));
          lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
          lineDash.setAttribute("y2", String(seletedRect.y + seletedRect.h));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4"); // 虚线样式
          lineDash.setAttribute("style", "display: block;");
        } else {
          // 隐藏虚线
          lineDash.setAttribute("style", "display: none;");
        }

        if (store.align.isHAlign) this.lines.right.setAttribute("style", "display: block;");
      }
    }

    if (this.y.node && this.y.node.id !== store.selected.dataset.id) {
      if (this.y.type === "top") {
        const absorbDistance = getAbsorbDistance(this.y.length);
        if (absorbDistance !== this.y.length) {
          store.selected.style.top = toPx(parseFloat(store.selected.style.top) - this.y.length + absorbDistance);
          this.y.length = absorbDistance;
          store.border.reRender(store);
        }
        const nodeRect = Rect.from(this.y.node);
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
        text.textContent = `${showNumber(this.y.length, true)}`;
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
          // seletedRect 在 nodeRect 左方
          lineDash.setAttribute("x1", String(seletedRect.x));
          lineDash.setAttribute("x2", String(nodeRect.x));
          lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
          lineDash.setAttribute("y2", String(nodeRect.y + nodeRect.h));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4"); // 虚线样式
          lineDash.setAttribute("style", "display: block;");
        } else if (seletedRect.x + seletedRect.w > nodeRect.x + nodeRect.w) {
          // seletedRect 在 nodeRect 下方，绘制下方和上方虚线
          lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
          lineDash.setAttribute("x2", String(seletedRect.x + seletedRect.w));
          lineDash.setAttribute("y1", String(nodeRect.y + nodeRect.h));
          lineDash.setAttribute("y2", String(nodeRect.y + nodeRect.h));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4"); // 虚线样式
          lineDash.setAttribute("style", "display: block;");
        } else {
          // 隐藏虚线
          lineDash.setAttribute("style", "display: none;");
        }
        if (store.align.isVAlign) this.lines.top.setAttribute("style", "display: block;");
      } else if (this.y.type === "bottom") {
        const absorbDistance = getAbsorbDistance(this.y.length);
        if (absorbDistance !== this.y.length) {
          store.selected.style.top = toPx(parseFloat(store.selected.style.top) + this.y.length - absorbDistance);
          this.y.length = absorbDistance;
          store.border.reRender(store);
        }
        const nodeRect = Rect.from(this.y.node);
        const seletedRect = Rect.from(store.selected);
        // 主线（垂直距离线）
        const line = getElement<SVGLineElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-line`);
        line.setAttribute("x1", String(seletedRect.x + seletedRect.w / 2));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w / 2));
        line.setAttribute("y1", String(seletedRect.y + seletedRect.h)); // 选中的节点底部
        line.setAttribute("y2", String(nodeRect.y)); // 目标节点顶部
        line.setAttribute("stroke", DISTANCE_COLOR);
        line.setAttribute("stroke-width", String(DISTANCE_WIDTH));

        // 距离文本
        const text = getElement<SVGTextElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-text`);
        text.textContent = `${showNumber(this.y.length, true)}`;
        const textX = seletedRect.x + seletedRect.w / 2 + (text.getComputedTextLength() + 10) / 2 + 3;
        text.setAttribute("x", String(textX));
        text.setAttribute("y", String((seletedRect.y + seletedRect.h + nodeRect.y) / 2 + 1)); // 线的中间位置
        text.setAttribute("fill", "#FFFFFF");
        text.setAttribute("font-size", String(DISTANCE_FONT_SIZE));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "middle");

        // 文本背景
        const textBg = getElement<SVGRectElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-text-bg`);
        textBg.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 + 3)); // 文本左侧稍微偏移
        textBg.setAttribute(
          "y",
          String((seletedRect.y + seletedRect.h + nodeRect.y) / 2 - (DISTANCE_FONT_SIZE + 4) / 2)
        );
        textBg.setAttribute("width", String(text.getComputedTextLength() + 10));
        textBg.setAttribute("height", String(DISTANCE_FONT_SIZE + 4));
        textBg.setAttribute("fill", DISTANCE_COLOR);
        textBg.setAttribute("rx", "4");
        textBg.setAttribute("ry", "4");

        // 起点矩形（位于选中的节点底部）
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

        // 终点矩形（位于目标节点顶部）
        const lineEnd = getElement<SVGRectElement>(this.lines.bottom, `${NODE_CLASS_PREFIX}-distance-bottom-line-end`);
        lineEnd.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - rectWidth / 2));
        lineEnd.setAttribute("y", String(nodeRect.y - rectHeight / 2));
        lineEnd.setAttribute("width", String(rectWidth));
        lineEnd.setAttribute("height", String(rectHeight));
        lineEnd.setAttribute("fill", DISTANCE_COLOR);

        // 虚线（辅助线）
        const lineDash = getElement<SVGLineElement>(
          this.lines.bottom,
          `${NODE_CLASS_PREFIX}-distance-bottom-dash-line`
        );
        if (seletedRect.x < nodeRect.x) {
          // 选中的节点在目标节点左侧
          lineDash.setAttribute("x1", String(seletedRect.x));
          lineDash.setAttribute("x2", String(nodeRect.x));
          lineDash.setAttribute("y1", String(nodeRect.y));
          lineDash.setAttribute("y2", String(nodeRect.y));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4");
          lineDash.setAttribute("style", "display: block;");
        } else if (seletedRect.x + seletedRect.w > nodeRect.x + nodeRect.w) {
          // 选中的节点在目标节点右侧
          lineDash.setAttribute("x1", String(nodeRect.x + nodeRect.w));
          lineDash.setAttribute("x2", String(seletedRect.x + seletedRect.w));
          lineDash.setAttribute("y1", String(nodeRect.y));
          lineDash.setAttribute("y2", String(nodeRect.y));
          lineDash.setAttribute("stroke", DISTANCE_COLOR);
          lineDash.setAttribute("stroke-width", "1");
          lineDash.setAttribute("stroke-dasharray", "4 4");
          lineDash.setAttribute("style", "display: block;");
        } else {
          // 隐藏虚线
          lineDash.setAttribute("style", "display: none;");
        }

        // 根据垂直对齐标志显示
        if (store.align.isVAlign) this.lines.bottom.setAttribute("style", "display: block;");
      }
    }
  }
}
