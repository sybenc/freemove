// align-line.ts
import { NodeAbsorbDelta, NodeClassPrefix } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { createElementNS, epsilonEqual, toPx } from "../utils";
import { AlignLineColor, AlignLineWidth } from "./const";
import { AlignLineData, AlignLineType } from "./type";

const alignLineTypes: AlignLineType[] = ["vl", "vc", "vr", "ht", "hc", "hb"];

function getAlignLinePostion(rect: Rect): Record<AlignLineType, number> {
  return {
    vl: rect.x,
    vc: rect.x + rect.w / 2,
    vr: rect.x + rect.w,
    ht: rect.y,
    hc: rect.y + rect.h / 2,
    hb: rect.y + rect.h,
  };
}

function handleSearchAlternateNodes(store: Store, align: Align) {
  const selectedRect = Rect.from(store.selected!);
  const nodeRects = store.nodes.filter((n) => n !== store.selected).map((n) => Rect.from(n));

  alignLineTypes.forEach((type) => (align.alternateNodes[type] = []));

  // 查找全部符合条件的备选元素
  nodeRects.forEach((nodeRect) => {
    if (selectedRect.isIntersect(nodeRect)) return;
    const selectedAlignLinePosition = getAlignLinePostion(selectedRect);

    alignLineTypes.forEach((type) => {
      let source = 10000,
        target = 10000,
        absorbDistance;

      // 水平方向上
      if (/^h/.test(type)) {
        if (selectedRect.x > nodeRect.x + nodeRect.w) {
          source = selectedRect.x + selectedRect.w;
          target = nodeRect.x;
        } else if (selectedRect.x + selectedRect.w < nodeRect.x) {
          source = selectedRect.x;
          target = nodeRect.x + nodeRect.w;
        } else {
          source = Math.min(selectedRect.x, nodeRect.x);
          target = Math.max(selectedRect.x + selectedRect.w, nodeRect.x + nodeRect.w);
        }
        [nodeRect.y, nodeRect.y + nodeRect.h / 2, nodeRect.y + nodeRect.h].forEach((pos) => {
          absorbDistance = Math.abs(selectedAlignLinePosition[type] - pos);
          if (absorbDistance <= NodeAbsorbDelta) {
            align.alternateNodes[type].push({
              type,
              source,
              target,
              absorbDistance,
              absorbPosition: pos,
              nodeRects: [nodeRect],
            });
          }
        });
      }

      // 竖直方向上
      if (/^v/.test(type)) {
        if (selectedRect.y > nodeRect.y + nodeRect.h) {
          source = selectedRect.y + selectedRect.h;
          target = nodeRect.y;
        } else if (selectedRect.y + selectedRect.h < nodeRect.y) {
          source = selectedRect.y;
          target = nodeRect.y + nodeRect.h;
        } else {
          source = Math.min(selectedRect.y, nodeRect.y);
          target = Math.max(selectedRect.y + selectedRect.h, nodeRect.y + nodeRect.h);
        }
        [nodeRect.x, nodeRect.x + nodeRect.w / 2, nodeRect.x + nodeRect.w].forEach((pos) => {
          absorbDistance = Math.abs(selectedAlignLinePosition[type] - pos);
          if (absorbDistance <= NodeAbsorbDelta) {
            align.alternateNodes[type].push({
              type,
              source,
              target,
              absorbDistance,
              absorbPosition: pos,
              nodeRects: [nodeRect],
            });
          }
        });
      }
    });
  });

  // 对于同一个吸附距离上存在多个目标节点时，会发生对齐线没有对准所有的目标节点，处理办法是
  // 根据吸附距离创建吸附距离和对齐线数据的映射，循环对齐线数据，找到对齐线的原点（最小值）和终点（最大值）
  // 由于找到了原点（最小值）和终点（最大值），我们不在关心其他对齐线的原点和终点
  // 为了免去过滤的烦恼，直接将所有节点的原点和终点，更改为最大值和最小值
  alignLineTypes.forEach((type) => {
    const map = new Map<number, AlignLineData[]>();
    align.alternateNodes[type].forEach((item) => {
      const arr = map.get(item.absorbDistance) || [];
      arr.push(item);
      map.set(item.absorbDistance, arr);
    });
    let min = Infinity,
      max = 0;
    map.forEach((group) => {
      group.forEach((i) => {
        min = Math.min(min, i.source, i.target);
        max = Math.max(max, i.source, i.target);
      });
    });
    map.forEach((group) => {
      group.forEach((i) => {
        i.source = min;
        i.target = max;
      });
    });
    align.alternateNodes[type] = Array.from(map.values()).flat();
  });
}

function handleAlignLineAbsorb(store: Store, align: Align, data: AlignLineData) {
  const { absorbPosition, type } = data;
  const selected = store.selected!;
  switch (type) {
    case "ht":
      selected.style.top = toPx(absorbPosition);
      break;
    case "hc":
      selected.style.top = toPx(absorbPosition - parseFloat(selected.style.height) / 2);
      break;
    case "hb":
      selected.style.top = toPx(absorbPosition - parseFloat(selected.style.height));
      break;
    case "vl":
      selected.style.left = toPx(absorbPosition);
      break;
    case "vc":
      selected.style.left = toPx(absorbPosition - parseFloat(selected.style.width) / 2);
      break;
    case "vr":
      selected.style.left = toPx(absorbPosition - parseFloat(selected.style.width));
      break;
  }

  // 更改了被选择元素的位置，所以需要重新寻找备选节点，并重新渲染selected-border
  handleSearchAlternateNodes(store, align);
  store.border.reRender(store);
}

function handleContainerAlignLineAbsorb(store: Store, align: Align) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  const selectedRect = Rect.from(store.selected!);
  const absorbPosition = containerRect.width / store.scale / 2;
  if (Math.abs(selectedRect.x + selectedRect.w / 2 - absorbPosition) <= NodeAbsorbDelta) {
    store.selected.style.left = toPx(absorbPosition - selectedRect.w / 2);
    align.showContainerAlignLine = true;
  }

  // 更改了被选择元素的位置，所以需要重新寻找备选节点，并重新渲染selected-border
  handleSearchAlternateNodes(store, align);
  store.border.reRender(store);
}

function handleDraw(store: Store, align: Align) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  const selectedRect = Rect.from(store.selected!);

  const alternateNodesFlat = Object.values(align.alternateNodes).flat();
  if ([...align.alternateNodes.hb, ...align.alternateNodes.hc, ...align.alternateNodes.ht].length === 0)
    align.isHAlign = false;
  else align.isHAlign = true;
  if ([...align.alternateNodes.vc, ...align.alternateNodes.vl, ...align.alternateNodes.vr].length === 0)
    align.isVAlign = false;
  else align.isVAlign = true;
  alternateNodesFlat.forEach((item) => {
    const { source, target, type } = item;
    const line = align.lines[type];

    if (/^h/.test(type)) {
      line?.setAttribute("x1", String(source));
      line?.setAttribute("x2", String(target));
      switch (type) {
        case "ht":
          line.setAttribute("y1", String(selectedRect.y));
          line.setAttribute("y2", String(selectedRect.y));
          break;
        case "hc":
          line.setAttribute("y1", String(selectedRect.y + selectedRect.h / 2));
          line.setAttribute("y2", String(selectedRect.y + selectedRect.h / 2));
          break;
        case "hb":
          line.setAttribute("y1", String(selectedRect.y + selectedRect.h));
          line.setAttribute("y2", String(selectedRect.y + selectedRect.h));
          break;
      }
    }
    if (/^v/.test(type)) {
      line?.setAttribute("y1", String(source));
      line?.setAttribute("y2", String(target));
      switch (type) {
        case "vl":
          line.setAttribute("x1", String(selectedRect.x));
          line.setAttribute("x2", String(selectedRect.x));
          break;
        case "vc":
          line.setAttribute("x1", String(selectedRect.x + selectedRect.w / 2));
          line.setAttribute("x2", String(selectedRect.x + selectedRect.w / 2));
          break;
        case "vr":
          line.setAttribute("x1", String(selectedRect.x + selectedRect.w));
          line.setAttribute("x2", String(selectedRect.x + selectedRect.w));
          break;
      }
    }

    line.setAttribute("stroke-width", String(AlignLineWidth / store.scale));
    line?.setAttribute("style", "display: 'block");
  });

  if (align.showContainerAlignLine) {
    const line = align.lines["vertical"];
    line.setAttribute("x1", String((containerRect.width / store.scale) / 2));
    line.setAttribute("y1", String(0));
    line.setAttribute("x2", String((containerRect.width / store.scale) / 2));
    line.setAttribute("y2", String(containerRect.height / store.scale));
    line.setAttribute("stroke-width", String(AlignLineWidth / store.scale));
    line?.setAttribute("style", "display: 'block");
  }
}

export class Align {
  g: SVGGElement;
  lines: Record<AlignLineType | "vertical", SVGLineElement>;
  isHAlign: boolean = false;
  isVAlign: boolean = false;
  alternateNodes: Record<AlignLineType, AlignLineData[]> = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: [],
  };
  showContainerAlignLine: boolean = false;

  constructor(svg: SVGSVGElement) {
    this.g = createElementNS<SVGGElement>("g");
    this.g.setAttribute("class", `${NodeClassPrefix}-align`);
    this.lines = {} as any;
    [...alignLineTypes, "vertical"].forEach((type) => {
      const line = createElementNS<SVGLineElement>("line");
      line.setAttribute("class", `${NodeClassPrefix}-align-${type}`);
      line.setAttribute("stroke", AlignLineColor);
      line.style.display = "none";
      this.g.append(line);
      this.lines[type as AlignLineType | "vertical"] = line;
    });
    svg.append(this.g);
  }

  hidden() {
    Object.values(this.lines).forEach((line) => {
      line.style.display = "none";
    });
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.hidden();
    this.alternateNodes = {
      ht: [],
      hc: [],
      hb: [],
      vl: [],
      vc: [],
      vr: [],
    };
    this.showContainerAlignLine = false;
    handleSearchAlternateNodes(store, this);
    // 处理吸附
    Object.values(this.alternateNodes)
      .flat()
      .forEach((item) => {
        handleAlignLineAbsorb(store, this, item);
      });
    handleContainerAlignLineAbsorb(store, this);

    // 在两个吸附点很近且两个矩形的长宽差距很小的时候 或者 水平垂直方向都有对齐线
    // 会造成对齐线显示异常
    // 修复方法是找到最小的吸附距离，只显示吸附距离最小的对齐线
    // 这段代码放在这里才会生效，处理完才能绘制对齐线
    let min = Infinity;
    alignLineTypes.forEach((type) => {
      this.alternateNodes[type].forEach((item) => {
        if (item.absorbDistance < min) min = item.absorbDistance;
      });
    });
    alignLineTypes.forEach((type) => {
      this.alternateNodes[type] = this.alternateNodes[type].filter((item) =>
        epsilonEqual(item.absorbDistance, min, 0.01)
      );
    });
    handleDraw(store, this);
  }
}
