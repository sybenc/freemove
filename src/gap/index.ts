import { NODE_CLASS_PREFIX } from '../const';
import Rect from '../rect';
import { Store } from '../store';
import { createElementNS } from '../utils';
import { GapRegion, EdgeCoord } from './type';

function searchDistanceBlockXData(store: Store): Map<number, GapRegion[]> {
  const xGapRegions = new Map<number, GapRegion[]>();

  function getGapRegions(currActiveRects: Rect[]) {
    const xEdgeCoords: EdgeCoord[] = [];

    // 根据活动矩形在x轴、y轴排序
    currActiveRects
      .toSorted((a, b) => a.x - b.x)
      .forEach(nodeRect => {
        xEdgeCoords.push({ value: nodeRect.x, type: 'min', nodeRect });
        xEdgeCoords.push({ value: nodeRect.x + nodeRect.w, type: 'max', nodeRect });
      });

    xEdgeCoords.sort((a, b) => a.value - b.value);

    for (let i = 0; i < xEdgeCoords.length - 1; i++) {
      const maxs: EdgeCoord[] = [];
      const mins: EdgeCoord[] = [];

      if (xEdgeCoords[i].type === 'max' && xEdgeCoords[i + 1].type === 'min') {
        for (let j = 0; j <= i; j++) {
          if (xEdgeCoords[i].value === xEdgeCoords[i - j].value) maxs.push(xEdgeCoords[i - j]);
          else break;
        }
        for (let j = i + 1; j <= xEdgeCoords.length; j++) {
          if (xEdgeCoords[i + 1].value === xEdgeCoords[j].value) mins.push(xEdgeCoords[j]);
          else break;
        }

        const gap = mins[0].value - maxs[0].value;
        const x = maxs[0].nodeRect.x;
        if (gap > 0) {
          const y = Math.min(...maxs.map(max => max.nodeRect.y), ...mins.map(min => min.nodeRect.y));
          const h = Math.max(
            ...maxs.map(max => max.nodeRect.y + max.nodeRect.h),
            ...mins.map(min => min.nodeRect.y + min.nodeRect.h)
          );
          const gapRegion: GapRegion = {
            x,
            y,
            w: gap,
            h: h - y,
            rect1: maxs.map(max => max.nodeRect),
            rect2: mins.map(min => min.nodeRect),
          };
          if (xGapRegions.has(gap)) xGapRegions.get(gap)?.push(gapRegion);
          else xGapRegions.set(gap, [gapRegion]);
        }
      }
    }
  }

  function mergeGapRegions() {
    xGapRegions.forEach((gapValue, gapKey) => {
      // 相同间距，根据x建立映射
      const xMap = new Map<number, GapRegion[]>();
      gapValue.forEach(gapRegion => {
        if (xMap.has(gapRegion.x)) {
          xMap.get(gapRegion.x)!.push(gapRegion);
        } else {
          xMap.set(gapRegion.x, [gapRegion]);
        }
      });

      xMap.forEach((xValue, xKey) => {
        const alternateY: number[] = [];
        // 这个H存储的不是高度，是高度和y坐标的和，因为要找合并高度
        const alternateH: number[] = [];
        const rect1 = new Set<Rect>();
        const rect2 = new Set<Rect>();
        xValue?.forEach(gapRegion => {
          alternateY.push(gapRegion.y);
          alternateH.push(gapRegion.y + gapRegion.h);
          gapRegion.rect1.forEach(rect => rect1.add(rect));
          gapRegion.rect2.forEach(rect => rect2.add(rect));
        });
        const finalY = Math.min(...alternateY);
        const finalH = Math.max(...alternateH);
        xMap.set(xKey, [
          {
            x: xKey,
            y: finalY,
            h: finalH - finalY,
            w: gapKey,
            rect1: Array.from(rect1),
            rect2: Array.from(rect2),
          },
        ]);
      });
      xGapRegions.set(gapKey, Array.from(xMap.values()).flat());
    });
  }
  const nodeRects: Rect[] = [];
  const seletedRect = Rect.from(store.selected!);

  // 获取节点参数
  store.nodes.forEach(node => {
    const nodeRect = Rect.from(node);
    nodeRects.push(nodeRect);
  });

  nodeRects.sort((a, b) => a.x - b.x);

  // 和当前被选择矩形在同一行的矩形集合
  const activeRects: Rect[] = [];
  // 在活动矩形上面的矩形
  const inactiveRects: Rect[] = [];
  let distance = Infinity;
  // 初始化活动矩形
  nodeRects.forEach(nodeRect => {
    const isActive =
      (nodeRect.y >= seletedRect.y && nodeRect.y <= seletedRect.y + seletedRect.h) ||
      (nodeRect.y + nodeRect.h / 2 >= seletedRect.y && nodeRect.y + nodeRect.h / 2 <= seletedRect.y + seletedRect.h) ||
      (nodeRect.y + nodeRect.h >= seletedRect.y && nodeRect.y + nodeRect.h <= seletedRect.y + seletedRect.h);
    if (isActive) {
      // 寻找最近的矩形，间距吸附要根据最近的矩形判断
      if (seletedRect.x + seletedRect.w < nodeRect.x) {
        const currDistance = Math.abs(seletedRect.x + seletedRect.w - nodeRect.x);
        if (distance > currDistance) {
          distance = currDistance
          store.distance.x.type = 'right';
          store.distance.x.node = nodeRect.node;
        } 
      }
      if (seletedRect.x > nodeRect.x + nodeRect.w) {
        const currDistance = Math.abs(seletedRect.x - nodeRect.x - nodeRect.w);
        if (distance > currDistance) {
          distance = currDistance
          store.distance.x.type = 'left';
          store.distance.x.node = nodeRect.node;
        } 
      }
      activeRects.push(nodeRect);
    } else inactiveRects.push(nodeRect);
  });

  getGapRegions(activeRects);

  // 从当前活动矩形向两边遍历
  inactiveRects.forEach(nodeRect => {
    activeRects.push(nodeRect);
    getGapRegions(activeRects);
  });

  mergeGapRegions();
  return xGapRegions;
}

function searchDistanceBlockYData(store: Store): Map<number, GapRegion[]> {
  const yGapRegions = new Map<number, GapRegion[]>();

  function getGapRegions(currActiveRects: Rect[]) {
    const yEdgeCoords: EdgeCoord[] = [];

    currActiveRects
      .toSorted((a, b) => a.y - b.y)
      .forEach(nodeRect => {
        yEdgeCoords.push({ value: nodeRect.y, type: 'min', nodeRect });
        yEdgeCoords.push({ value: nodeRect.y + nodeRect.h, type: 'max', nodeRect });
      });

    yEdgeCoords.sort((a, b) => a.value - b.value);

    for (let i = 0; i < yEdgeCoords.length - 1; i++) {
      const maxs: EdgeCoord[] = [];
      const mins: EdgeCoord[] = [];

      if (yEdgeCoords[i].type === 'max' && yEdgeCoords[i + 1].type === 'min') {
        for (let j = 0; j <= i; j++) {
          if (yEdgeCoords[i].value === yEdgeCoords[i - j].value) maxs.push(yEdgeCoords[i - j]);
          else break;
        }
        for (let j = i + 1; j <= yEdgeCoords.length; j++) {
          if (yEdgeCoords[i + 1].value === yEdgeCoords[j].value) mins.push(yEdgeCoords[j]);
          else break;
        }

        const gap = mins[0].value - maxs[0].value;
        const y = maxs[0].nodeRect.y;
        if (gap > 0) {
          const x = Math.min(...maxs.map(max => max.nodeRect.x), ...mins.map(min => min.nodeRect.x));
          const w = Math.max(
            ...maxs.map(max => max.nodeRect.x + max.nodeRect.w),
            ...mins.map(min => min.nodeRect.x + min.nodeRect.w)
          );
          const gapRegion: GapRegion = {
            x,
            y,
            w: w - x,
            h: gap,
            rect1: maxs.map(max => max.nodeRect),
            rect2: mins.map(min => min.nodeRect),
          };
          if (yGapRegions.has(gap)) yGapRegions.get(gap)?.push(gapRegion);
          else yGapRegions.set(gap, [gapRegion]);
        }
      }
    }
  }

  function mergeGapRegions() {
    yGapRegions.forEach((gapValue, gapKey) => {
      // 相同间距，根据x建立映射
      const yMap = new Map<number, GapRegion[]>();
      gapValue.forEach(gapRegion => {
        if (yMap.has(gapRegion.y)) {
          yMap.get(gapRegion.y)!.push(gapRegion);
        } else {
          yMap.set(gapRegion.y, [gapRegion]);
        }
      });

      yMap.forEach((yValue, yKey) => {
        const alternateX: number[] = [];
        // 这个H存储的不是高度，是高度和y坐标的和，因为要找合并高度
        const alternateW: number[] = [];
        const rect1 = new Set<Rect>();
        const rect2 = new Set<Rect>();
        yValue?.forEach(gapRegion => {
          alternateX.push(gapRegion.x);
          alternateW.push(gapRegion.x + gapRegion.w);
          gapRegion.rect1.forEach(rect => rect1.add(rect));
          gapRegion.rect2.forEach(rect => rect2.add(rect));
        });
        const finalX = Math.min(...alternateX);
        const finalW = Math.max(...alternateW);
        yMap.set(yKey, [
          {
            x: finalX,
            y: yKey,
            h: gapKey,
            w: finalW - finalX,
            rect1: Array.from(rect1),
            rect2: Array.from(rect2),
          },
        ]);
      });
      yGapRegions.set(gapKey, Array.from(yMap.values()).flat());
    });
  }
  const nodeRects: Rect[] = [];
  const seletedRect = Rect.from(store.selected!);

  // 获取节点参数
  store.nodes.forEach(node => {
    const nodeRect = Rect.from(node);
    nodeRects.push(nodeRect);
  });

  nodeRects.sort((a, b) => a.y - b.y);

  // 和当前被选择矩形在同一行的矩形集合
  const activeRects: Rect[] = [];
  // 在活动矩形上面的矩形
  const inactiveRects: Rect[] = [];
  let distance = Infinity
  // 初始化活动矩形
  nodeRects.forEach(nodeRect => {
    const isActive =
      (nodeRect.x >= seletedRect.x && nodeRect.x <= seletedRect.x + seletedRect.w) ||
      (nodeRect.x + nodeRect.w / 2 >= seletedRect.x && nodeRect.x + nodeRect.w / 2 <= seletedRect.x + seletedRect.w) ||
      (nodeRect.x + nodeRect.w >= seletedRect.x && nodeRect.x + nodeRect.w <= seletedRect.x + seletedRect.w);
    if (isActive) {
       // 寻找最近的矩形，间距吸附要根据最近的矩形判断
       if (seletedRect.y + seletedRect.h < nodeRect.y) {
        const currDistance = Math.abs(seletedRect.y + seletedRect.h - nodeRect.y);
        if (distance > currDistance) {
          distance = currDistance
          store.distance.y.type = 'bottom';
          store.distance.y.node = nodeRect.node;
        } 
      }
      if (seletedRect.y > nodeRect.y + nodeRect.h) {
        const currDistance = Math.abs(seletedRect.y - nodeRect.y - nodeRect.h);
        if (distance > currDistance) {
          distance = currDistance
          store.distance.y.type = 'top';
          store.distance.y.node = nodeRect.node;
        } 
      }
      activeRects.push(nodeRect);
    } else inactiveRects.push(nodeRect);
  });

  getGapRegions(activeRects);

  // 从当前活动矩形向两边遍历
  inactiveRects.forEach(nodeRect => {
    activeRects.push(nodeRect);
    getGapRegions(activeRects);
  });

  mergeGapRegions();
  return yGapRegions;
}

export class Gap {
  g: SVGGElement;

  constructor(svg: SVGSVGElement) {
    this.g = createElementNS('g');
    this.g.setAttribute('class', `${NODE_CLASS_PREFIX}-gap`);
    svg.append(this.g);
  }

  clear() {
    this.g.innerHTML = '';
  }

  reRender(store: Store) {
    const blockXData = searchDistanceBlockXData(store);
    const blockYData = searchDistanceBlockYData(store);
  }
}
