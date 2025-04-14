import { ABSORB_DELTA, CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { epsilonEqual, toPx } from "../utils";
import { ALIGNLINE_COLOR, ALIGNLINE_WIDTH } from "./const";
import { AlignLineData, AlignLineType } from "./type";

export const alignLineTypes: AlignLineType[] = ["vl", "vc", "vr", "ht", "hc", "hb"];

// 创建对齐线的dom元素
function createAlignLineDom(store: Store): SVGLineElement[] {
  const nodes: SVGLineElement[] = [];

  alignLineTypes.forEach((type) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `${CLASS_PREFIX}-alignLine-${type}`);
    line.setAttribute("stroke", ALIGNLINE_COLOR);
    line.setAttribute("stroke-width", String(ALIGNLINE_WIDTH));
    line.style.display = "none";
    nodes.push(line);
  });
  return nodes;
}

function renderAlignLine(store: Store) {
  const alternateNodes: Record<AlignLineType, AlignLineData[]> = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: [],
  };

  function handleSearchAlternateNodes() {
    let seletedRect = Rect.from(store.selected!);
    alternateNodes.hb = [];
    alternateNodes.hc = [];
    alternateNodes.ht = [];
    alternateNodes.vc = [];
    alternateNodes.vl = [];
    alternateNodes.vr = [];
    // 查找全部符合条件的备选元素
    store.nodes.forEach(item => {
      const nodeRect = Rect.from(item);
      if (seletedRect.isIntersect(nodeRect)) return;
      const seletedAlignLinePosition = seletedRect.getAlignLinePostion();
      alignLineTypes.forEach((type) => {
        let source: number = 10000,
          target: number = 10000,
          absorbDistance: number;
        if (/^h/.test(type)) {
          if (seletedRect.x > nodeRect.x + nodeRect.w) {
            source = seletedRect.x + seletedRect.w;
            target = nodeRect.x;
          } else if (seletedRect.x + seletedRect.w < nodeRect.x) {
            source = seletedRect.x;
            target = nodeRect.x + nodeRect.w;
          } else {
            source = Math.min(seletedRect.x, nodeRect.x);
            target = Math.max(seletedRect.x + seletedRect.w, nodeRect.x + nodeRect.w);
          }
          [nodeRect.y, nodeRect.y + nodeRect.h / 2, nodeRect.y + nodeRect.h].forEach((item) => {
            absorbDistance = Math.abs(seletedAlignLinePosition[type] - item);
            if (absorbDistance <= ABSORB_DELTA) {
              alternateNodes[type].push({
                type,
                source,
                target,
                absorbDistance,
                absorbPosition: item,
                nodeRects: [nodeRect],
              });
            }
          });
        }
        if (/^v/.test(type)) {
          if (seletedRect.y > nodeRect.y + nodeRect.h) {
            source = seletedRect.y + seletedRect.h;
            target = nodeRect.y;
          } else if (seletedRect.y + seletedRect.h < nodeRect.y) {
            source = seletedRect.y;
            target = nodeRect.y + nodeRect.h;
          } else {
            source = Math.min(seletedRect.y, nodeRect.y);
            target = Math.max(seletedRect.y + seletedRect.h, nodeRect.y + nodeRect.h);
          }
          [nodeRect.x, nodeRect.x + nodeRect.w / 2, nodeRect.x + nodeRect.w].forEach((position) => {
            absorbDistance = Math.abs(seletedAlignLinePosition[type] - position);
            if (absorbDistance <= ABSORB_DELTA) {
              alternateNodes[type].push({
                type,
                source,
                target,
                absorbDistance,
                absorbPosition: position,
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
    alignLineTypes.forEach(type=>{
      const map = new Map<number, AlignLineData[]>()
      alternateNodes[type].forEach(item=>{
        if(!map.has(item.absorbDistance)) map.set(item.absorbDistance, [item])
        else map.get(item.absorbDistance)?.push(item)
      })
      let min = Infinity, max = 0
      map.forEach(item=>{
        item.forEach(i => {
          min = Math.min(i.source, min)
          min = Math.min(i.target, min)
          max = Math.max(i.source, max)
          max = Math.max(i.target, max)
        })
      })
      map.forEach(item=>{
        item.forEach(i => {
          i.source = min
          i.target = max
        })
      })
      alternateNodes[type] = Array.from(map.values()).flat()
    })
  }

  function handleAbsorb(data: AlignLineData) {
    if (!store.selected || !data) return;
    const { absorbPosition, type } = data;
    switch (type) {
      case "ht":
        store.selected.style.top = toPx(absorbPosition);
        break;
      case "hc":
        store.selected.style.top = toPx(absorbPosition - parseFloat(store.selected.style.height) / 2);
        break;
      case "hb":
        store.selected.style.top = toPx(absorbPosition - parseFloat(store.selected.style.height));
        break;
      case "vl":
        store.selected.style.left = toPx(absorbPosition);
        break;
      case "vc":
        store.selected.style.left = toPx(absorbPosition - parseFloat(store.selected.style.width) / 2);
        break;
      case "vr":
        store.selected.style.left = toPx(absorbPosition - parseFloat(store.selected.style.width));
        break;
    }
    // 由于更改了位置，重新查找对齐线
    handleSearchAlternateNodes();
    store.seletedBorder.reRender(store)
    // console.log(alternateNodes)
    // 在两个吸附点很近，且两个矩形的长宽差距很小的时候，会造成对齐线显示异常
    // 修复方法是找到最小的吸附距离，只显示吸附距离最小的对齐线
    let min = Infinity
    alignLineTypes.forEach(type=>{
      alternateNodes[type].forEach(item=>{
        if (item.absorbDistance < min) min = item.absorbDistance
      })
    })
    alignLineTypes.forEach(type=>{
      alternateNodes[type].forEach(item=>{
        if (item.absorbDistance - min > 0.1) alternateNodes[type] = []
      })
    })
  }

  function handleDraw() {
    if (!store.selected) return;
    const selectedRect = Rect.from(store.selected!);

    const alternateNodesFlat = Object.values(alternateNodes).flat();
    alternateNodesFlat.forEach((item) => {
      const { source, target, type } = item;
      const line = store.alignLine.g.getElementsByClassName(`${CLASS_PREFIX}-alignLine-${type}`)[0];

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
      line?.setAttribute("style", "display: 'block");
    });
  }

  handleSearchAlternateNodes();
  // 处理吸附
  Object.values(alternateNodes).flat().forEach(item=>{
    handleAbsorb(item);
  })
  handleDraw();
}

export class AlignLine {
  g: SVGGElement;

  constructor(svg: SVGSVGElement) {
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${CLASS_PREFIX}-alignLine`);
    svg.append(this.g);
  }

  // 清除分组内所有对齐线
  clear() {
    this.g.innerHTML = "";
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.clear();
    this.g.append(...createAlignLineDom(store));
    renderAlignLine(store);
  }
}
