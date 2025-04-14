// align-line.ts
import { NODE_ABSORB_DELTA, NODE_CLASS_PREFIX } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { epsilonEqual, toPx } from "../utils";
import { ALIGNLINE_COLOR, ALIGNLINE_WIDTH } from "./const";
import { AlignLineData, AlignLineType } from "./type";

export const alignLineTypes: AlignLineType[] = ["vl", "vc", "vr", "ht", "hc", "hb"];

function renderAlignLine(store: Store, lines: Record<AlignLineType, SVGLineElement>) {
  const alternateNodes: Record<AlignLineType, AlignLineData[]> = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: [],
  };

  function handleSearchAlternateNodes() {
    const selectedRect = Rect.from(store.selected!);
    const nodeRects = store.nodes.filter((n) => n !== store.selected).map((n) => Rect.from(n));

    alignLineTypes.forEach((type) => (alternateNodes[type] = []));

    nodeRects.forEach((nodeRect) => {
      if (selectedRect.isIntersect(nodeRect)) return;
      const selectedAlignLinePosition = selectedRect.getAlignLinePostion();

      alignLineTypes.forEach((type) => {
        let source = 10000,
          target = 10000,
          absorbDistance;

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
            if (absorbDistance <= NODE_ABSORB_DELTA) {
              alternateNodes[type].push({
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
            if (absorbDistance <= NODE_ABSORB_DELTA) {
              alternateNodes[type].push({
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

    // 合并相同吸附距离的数据
    alignLineTypes.forEach((type) => {
      const map = new Map<number, AlignLineData[]>();
      alternateNodes[type].forEach((item) => {
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
      alternateNodes[type] = Array.from(map.values()).flat();
    });
  }

  function handleAbsorb(data: AlignLineData) {
    const { absorbPosition, type } = data;
    const el = store.selected!;
    switch (type) {
      case "ht":
        el.style.top = toPx(absorbPosition);
        break;
      case "hc":
        el.style.top = toPx(absorbPosition - parseFloat(el.style.height) / 2);
        break;
      case "hb":
        el.style.top = toPx(absorbPosition - parseFloat(el.style.height));
        break;
      case "vl":
        el.style.left = toPx(absorbPosition);
        break;
      case "vc":
        el.style.left = toPx(absorbPosition - parseFloat(el.style.width) / 2);
        break;
      case "vr":
        el.style.left = toPx(absorbPosition - parseFloat(el.style.width));
        break;
    }
    handleSearchAlternateNodes();
    store.seletedBorder.reRender(store);

    let min = Infinity;
    alignLineTypes.forEach((type) => {
      alternateNodes[type].forEach((item) => {
        if (item.absorbDistance < min) min = item.absorbDistance;
      });
    });
    alignLineTypes.forEach((type) => {
      alternateNodes[type] = alternateNodes[type].filter((item) => epsilonEqual(item.absorbDistance, min, 0.1));
    });
  }

  function handleDraw() {
    const selectedRect = Rect.from(store.selected!);
    const nodes = Object.values(alternateNodes).flat();
    nodes.forEach(({ source, target, type }) => {
      const line = lines[type];
      if (!line) return;

      if (/^h/.test(type)) {
        line.setAttribute("x1", String(source));
        line.setAttribute("x2", String(target));
        const y =
          type === "ht"
            ? selectedRect.y
            : type === "hc"
            ? selectedRect.y + selectedRect.h / 2
            : selectedRect.y + selectedRect.h;
        line.setAttribute("y1", String(y));
        line.setAttribute("y2", String(y));
      }

      if (/^v/.test(type)) {
        line.setAttribute("y1", String(source));
        line.setAttribute("y2", String(target));
        const x =
          type === "vl"
            ? selectedRect.x
            : type === "vc"
            ? selectedRect.x + selectedRect.w / 2
            : selectedRect.x + selectedRect.w;
        line.setAttribute("x1", String(x));
        line.setAttribute("x2", String(x));
      }
      line.style.display = "block";
    });
  }

  handleSearchAlternateNodes();
  Object.values(alternateNodes)
    .flat()
    .forEach((item) => handleAbsorb(item));
  handleDraw();
}

export class AlignLine {
  g: SVGGElement;
  lines: Record<AlignLineType, SVGLineElement>;

  constructor(svg: SVGSVGElement) {
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-alignLine`);
    svg.append(this.g);

    this.lines = {} as any;
    alignLineTypes.forEach((type) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("class", `${NODE_CLASS_PREFIX}-alignLine-${type}`);
      line.setAttribute("stroke", ALIGNLINE_COLOR);
      line.setAttribute("stroke-width", String(ALIGNLINE_WIDTH));
      line.style.display = "none";
      this.g.append(line);
      this.lines[type] = line;
    });
  }

  hidden() {
    Object.values(this.lines).forEach((line) => {
      line.style.display = "none";
    });
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.hidden();
    renderAlignLine(store, this.lines);
  }
}
