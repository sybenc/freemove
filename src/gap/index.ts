import { NodeAbsorbDelta, ClassPrefix } from "../const";
import Rect from "../rect";
import { Store } from "../store";
import { createElementNS, epsilonEqual, toPx } from "../utils";
import { GapRegion, EdgeCoord } from "./type";

function searchDistanceBlockHData(store: Store): Map<number, GapRegion[]> {
  const xGapRegions = new Map<number, GapRegion[]>();

  function getGapRegions(currActiveRects: Rect[]) {
    const xEdgeCoords: EdgeCoord[] = [];

    // 根据活动矩形在x轴、y轴排序
    currActiveRects
      .toSorted((a, b) => a.x - b.x)
      .forEach((nodeRect) => {
        xEdgeCoords.push({ value: nodeRect.x, type: "min", nodeRect });
        xEdgeCoords.push({ value: nodeRect.x + nodeRect.w, type: "max", nodeRect });
      });

    xEdgeCoords.sort((a, b) => a.value - b.value);

    for (let i = 0; i < xEdgeCoords.length - 1; i++) {
      const maxs: EdgeCoord[] = [];
      const mins: EdgeCoord[] = [];

      if (xEdgeCoords[i].type === "max" && xEdgeCoords[i + 1].type === "min") {
        for (let j = 0; j <= i; j++) {
          if (xEdgeCoords[i].value === xEdgeCoords[i - j].value) maxs.push(xEdgeCoords[i - j]);
          else break;
        }
        for (let j = i + 1; j <= xEdgeCoords.length; j++) {
          if (xEdgeCoords[i + 1].value === xEdgeCoords[j].value) mins.push(xEdgeCoords[j]);
          else break;
        }

        const gap = mins[0].value - maxs[0].value;
        const x = maxs[0].nodeRect.x + maxs[0].nodeRect.w;
        if (gap > 0) {
          const y = Math.min(...maxs.map((max) => max.nodeRect.y), ...mins.map((min) => min.nodeRect.y));
          const h = Math.max(
            ...maxs.map((max) => max.nodeRect.y + max.nodeRect.h),
            ...mins.map((min) => min.nodeRect.y + min.nodeRect.h)
          );
          const gapRegion: GapRegion = {
            x,
            y,
            w: gap,
            h: h - y,
            rect1: maxs.map((max) => max.nodeRect),
            rect2: mins.map((min) => min.nodeRect),
          };
          if (xGapRegions.has(gap)) xGapRegions.get(gap)?.push(gapRegion);
          else xGapRegions.set(gap, [gapRegion]);
        }
      }
    }
  }

  // function mergeGapRegions() {
  //   xGapRegions.forEach((gapValue, gapKey) => {
  //     // 相同间距，根据x建立映射
  //     const xMap = new Map<number, GapRegion[]>();
  //     gapValue.forEach((gapRegion) => {
  //       if (xMap.has(gapRegion.x)) {
  //         xMap.get(gapRegion.x)!.push(gapRegion);
  //       } else {
  //         xMap.set(gapRegion.x, [gapRegion]);
  //       }
  //     });

  //     xMap.forEach((xValue, xKey) => {
  //       const alternateY: number[] = [];
  //       // 这个H存储的不是高度，是高度和y坐标的和，因为要找合并高度
  //       const alternateH: number[] = [];
  //       const rect1 = new Set<Rect>();
  //       const rect2 = new Set<Rect>();
  //       xValue?.forEach((gapRegion) => {
  //         alternateY.push(gapRegion.y);
  //         alternateH.push(gapRegion.y + gapRegion.h);
  //         gapRegion.rect1.forEach((rect) => rect1.add(rect));
  //         gapRegion.rect2.forEach((rect) => rect2.add(rect));
  //       });
  //       const finalY = Math.min(...alternateY);
  //       const finalH = Math.max(...alternateH);
  //       xMap.set(xKey, [
  //         {
  //           x: xKey,
  //           y: finalY,
  //           h: finalH - finalY,
  //           w: gapKey,
  //           rect1: Array.from(rect1),
  //           rect2: Array.from(rect2),
  //         },
  //       ]);
  //     });
  //     xGapRegions.set(gapKey, Array.from(xMap.values()).flat());
  //   });
  // }
  const nodeRects: Rect[] = [];
  const seletedRect = Rect.from(store.selected!);

  // 获取节点参数
  store.nodes.forEach((node) => {
    const nodeRect = Rect.from(node);
    nodeRects.push(nodeRect);
  });

  nodeRects.sort((a, b) => a.x - b.x);

  // 和当前被选择矩形在同一行的矩形集合
  const activeRects: Rect[] = [];
  // 在活动矩形上面的矩形
  const inactiveRects: Rect[] = [];
  // 初始化活动矩形
  nodeRects.forEach((nodeRect) => {
    const isActive =
      (nodeRect.y <= seletedRect.y && nodeRect.y + nodeRect.h >= seletedRect.y) ||
      (nodeRect.y <= seletedRect.y + seletedRect.h / 2 &&
        nodeRect.y + nodeRect.h >= seletedRect.y + seletedRect.h / 2) ||
      (nodeRect.y <= seletedRect.y + seletedRect.h && nodeRect.y + nodeRect.h >= seletedRect.y + seletedRect.h);
    if (isActive) {
      activeRects.push(nodeRect);
    } else inactiveRects.push(nodeRect);
  });

  getGapRegions(activeRects);

  // // 从当前活动矩形向两边遍历
  // inactiveRects.forEach((nodeRect) => {
  //   activeRects.push(nodeRect);
  //   getGapRegions(activeRects);
  // });

  // mergeGapRegions();
  return xGapRegions;
}

// function searchDistanceBlockVData(store: Store): Map<number, GapRegion[]> {
//   const yGapRegions = new Map<number, GapRegion[]>();

//   function getGapRegions(currActiveRects: Rect[]) {
//     const yEdgeCoords: EdgeCoord[] = [];

//     currActiveRects
//       .toSorted((a, b) => a.y - b.y)
//       .forEach((nodeRect) => {
//         yEdgeCoords.push({ value: nodeRect.y, type: "min", nodeRect });
//         yEdgeCoords.push({ value: nodeRect.y + nodeRect.h, type: "max", nodeRect });
//       });

//     yEdgeCoords.sort((a, b) => a.value - b.value);

//     for (let i = 0; i < yEdgeCoords.length - 1; i++) {
//       const maxs: EdgeCoord[] = [];
//       const mins: EdgeCoord[] = [];

//       if (yEdgeCoords[i].type === "max" && yEdgeCoords[i + 1].type === "min") {
//         for (let j = 0; j <= i; j++) {
//           if (yEdgeCoords[i].value === yEdgeCoords[i - j].value) maxs.push(yEdgeCoords[i - j]);
//           else break;
//         }
//         for (let j = i + 1; j <= yEdgeCoords.length; j++) {
//           if (yEdgeCoords[i + 1].value === yEdgeCoords[j].value) mins.push(yEdgeCoords[j]);
//           else break;
//         }

//         const gap = mins[0].value - maxs[0].value;
//         const y = maxs[0].nodeRect.y + maxs[0].nodeRect.h;
//         if (gap > 0) {
//           const x = Math.min(...maxs.map((max) => max.nodeRect.x), ...mins.map((min) => min.nodeRect.x));
//           const w = Math.max(
//             ...maxs.map((max) => max.nodeRect.x + max.nodeRect.w),
//             ...mins.map((min) => min.nodeRect.x + min.nodeRect.w)
//           );
//           const gapRegion: GapRegion = {
//             x,
//             y,
//             w: w - x,
//             h: gap,
//             rect1: maxs.map((max) => max.nodeRect),
//             rect2: mins.map((min) => min.nodeRect),
//           };
//           if (yGapRegions.has(gap)) yGapRegions.get(gap)?.push(gapRegion);
//           else yGapRegions.set(gap, [gapRegion]);
//         }
//       }
//     }
//   }

//   function mergeGapRegions() {
//     yGapRegions.forEach((gapValue, gapKey) => {
//       // 相同间距，根据x建立映射
//       const yMap = new Map<number, GapRegion[]>();
//       gapValue.forEach((gapRegion) => {
//         if (yMap.has(gapRegion.y)) {
//           yMap.get(gapRegion.y)!.push(gapRegion);
//         } else {
//           yMap.set(gapRegion.y, [gapRegion]);
//         }
//       });

//       yMap.forEach((yValue, yKey) => {
//         const alternateX: number[] = [];
//         // 这个H存储的不是高度，是高度和y坐标的和，因为要找合并高度
//         const alternateW: number[] = [];
//         const rect1 = new Set<Rect>();
//         const rect2 = new Set<Rect>();
//         yValue?.forEach((gapRegion) => {
//           alternateX.push(gapRegion.x);
//           alternateW.push(gapRegion.x + gapRegion.w);
//           gapRegion.rect1.forEach((rect) => rect1.add(rect));
//           gapRegion.rect2.forEach((rect) => rect2.add(rect));
//         });
//         const finalX = Math.min(...alternateX);
//         const finalW = Math.max(...alternateW);
//         yMap.set(yKey, [
//           {
//             x: finalX,
//             y: yKey,
//             h: gapKey,
//             w: finalW - finalX,
//             rect1: Array.from(rect1),
//             rect2: Array.from(rect2),
//           },
//         ]);
//       });
//       yGapRegions.set(gapKey, Array.from(yMap.values()).flat());
//     });
//   }
//   const nodeRects: Rect[] = [];
//   const seletedRect = Rect.from(store.selected!);

//   // 获取节点参数
//   store.nodes.forEach((node) => {
//     const nodeRect = Rect.from(node);
//     nodeRects.push(nodeRect);
//   });

//   nodeRects.sort((a, b) => a.y - b.y);

//   // 和当前被选择矩形在同一行的矩形集合
//   const activeRects: Rect[] = [];
//   // 在活动矩形上面的矩形
//   const inactiveRects: Rect[] = [];
//   // 初始化活动矩形
//   nodeRects.forEach((nodeRect) => {
//     const isActive =
//       (nodeRect.x <= seletedRect.x && nodeRect.x + nodeRect.w >= seletedRect.x) ||
//       (nodeRect.x <= seletedRect.x + seletedRect.w / 2 &&
//         nodeRect.x + nodeRect.w >= seletedRect.x + seletedRect.w / 2) ||
//       (nodeRect.x <= seletedRect.x + seletedRect.w && nodeRect.x + nodeRect.w >= seletedRect.x + seletedRect.w);
//     if (isActive) {
//       activeRects.push(nodeRect);
//     } else inactiveRects.push(nodeRect);
//   });

//   getGapRegions(activeRects);

//   // 从当前活动矩形向两边遍历
//   inactiveRects.forEach((nodeRect) => {
//     activeRects.push(nodeRect);
//     getGapRegions(activeRects);
//   });

//   mergeGapRegions();
//   return yGapRegions;
// }

export class Gap {
  g: SVGGElement;

  constructor(svg: SVGSVGElement) {
    this.g = createElementNS("g");
    this.g.setAttribute("class", `${ClassPrefix}-gap`);
    svg.append(this.g);
  }

  clear() {
    this.g.innerHTML = "";
  }

  reRender(store: Store) {
    if (!store.selected) return;
    this.clear();
    const { left, right, top, bottom } = store.distance;
    const selectedRect = Rect.from(store.selected);
    const getLegalValue = (value: number) => {
      return value < 0 ? 0 : value;
    };
    if (left.node && right.node && store.align.isHAlign && !store.align.isVAlign) {
      const rightRect = Rect.from(right.node);
      const leftRect = Rect.from(left.node);
      const gap = (rightRect.x - leftRect.x - leftRect.w - selectedRect.w) / 2;
      if (Math.abs(selectedRect.x - leftRect.x - leftRect.w - gap) <= NodeAbsorbDelta) {
        store.selected.style.left = toPx(leftRect.x + leftRect.w + gap);
        selectedRect.sync();
      }
    }
    if (top.node && bottom.node && !store.align.isHAlign && store.align.isVAlign) {
      const bottomRect = Rect.from(bottom.node);
      const topRect = Rect.from(top.node);
      const gap = (bottomRect.y - topRect.y - topRect.h - selectedRect.h) / 2;
      if (Math.abs(selectedRect.y - topRect.y - topRect.h - gap) <= NodeAbsorbDelta) {
        store.selected.style.top = toPx(topRect.y + topRect.h + gap);
        selectedRect.sync();
      }
    }
    store.align.reRender(store);
    store.distance.reRender(store);
    store.border.reRender(store);

    // if (store.align.isHAlign) {
    //   const showBlockH: GapRegion[] = [];
    //   const blockHData = searchDistanceBlockHData(store);
    //   const line = store.distance.left.length > store.distance.right.length ? right : left;
    //   if (line.node) {
    //     const nodeRect = Rect.from(line.node!);
    //     blockHData.forEach((value, key) => {
    //       if (Math.abs(line.length - key) <= NodeAbsorbDelta || (key <= 20 && Math.abs(line.length - key) <= 4)) {
    //         const nodeArray = [...value.map((item) => item.rect1.concat(item.rect2))].flat();
    //         if (nodeArray.some((node) => node.id === store.selected?.dataset.id)) {
    //           showBlockH.push(...value);
    //           return;
    //         }
    //         if (line.length === right.length) {
    //           store.selected!.style.left = toPx(nodeRect.x - key - selectedRect.w);
    //           store.distance.left.length = key;
    //           showBlockH.push(...value);
    //           selectedRect.sync();
    //         } else if (line.length === left.length) {
    //           store.selected!.style.left = toPx(nodeRect.x + nodeRect.w + key);
    //           store.distance.right.length = key;
    //           showBlockH.push(...value);
    //           selectedRect.sync();
    //         }

    //         store.align.reRender(store);
    //         store.distance.reRender(store);
    //         store.border.reRender(store);
    //       }
    //     });

    //     if (showBlockH.length > 1) {
    //       showBlockH.forEach((block) => {
    //         const rect = createElementNS<SVGRectElement>("rect");
    //         rect.setAttribute("x", String(block.x));
    //         rect.setAttribute("y", String(block.y));
    //         rect.setAttribute(
    //           "width",
    //           String(
    //             line.length === right.length
    //               ? getLegalValue(nodeRect.x - selectedRect.x - selectedRect.w)
    //               : getLegalValue(selectedRect.x - nodeRect.x - nodeRect.w)
    //           )
    //         );
    //         rect.setAttribute("height", String(block.h));
    //         rect.setAttribute("fill", "red");
    //         rect.setAttribute("opacity", "0.3");
    //         if (line.length === right.length) {
    //           rect.setAttribute("width", String(getLegalValue(nodeRect.x - selectedRect.x - selectedRect.w)));
    //         }
    //         if (line.length === left.length) {
    //           rect.setAttribute("width", String(getLegalValue(selectedRect.x - nodeRect.x - nodeRect.w)));
    //         }
    //         this.g.append(rect);
    //       });
    //     }
    //   }
    // }

    // if (store.align.isVAlign) {
    //   const showBlockV: GapRegion[] = [];
    //   const blockVData = searchDistanceBlockVData(store);
    //   const line = store.distance.top.length > store.distance.bottom.length ? bottom : top;
    //   if (line.node) {
    //     const nodeRect = Rect.from(line.node!);
    //     blockVData.forEach((value, key) => {
    //       if (Math.abs(line.length - key) <= NODE_ABSORB_DELTA || (key <= 20 && Math.abs(line.length - key) <= 4)) {
    //         const nodeArray = [...value.map((item) => item.rect1.concat(item.rect2))].flat();
    //         if (nodeArray.some((node) => node.id === store.selected?.dataset.id)) {
    //           showBlockV.push(...value);
    //           return;
    //         }
    //         if (line.length === bottom.length) {
    //           store.selected!.style.top = toPx(nodeRect.y - key - selectedRect.h);
    //           store.distance.top.length = key;
    //           showBlockV.push(...value);
    //           selectedRect.sync();
    //         } else if (line.length === top.length) {
    //           store.selected!.style.top = toPx(nodeRect.y + nodeRect.h + key);
    //           store.distance.bottom.length = key;
    //           showBlockV.push(...value);
    //           selectedRect.sync();
    //         }

    //         store.align.reRender(store);
    //         store.distance.reRender(store);
    //         store.border.reRender(store);
    //       }
    //     });

    //     if (showBlockV.length > 1) {
    //       showBlockV.forEach((block) => {
    //         const rect = createElementNS<SVGRectElement>("rect");
    //         rect.setAttribute("x", String(block.x));
    //         rect.setAttribute("y", String(block.y));
    //         rect.setAttribute("width", String(block.w));
    //         rect.setAttribute(
    //           "height",
    //           String(
    //             line.length === bottom.length
    //               ? getLegalValue(nodeRect.y - selectedRect.y - selectedRect.h)
    //               : getLegalValue(selectedRect.y - nodeRect.y - nodeRect.h)
    //           )
    //         );
    //         rect.setAttribute("fill", "#F5E0E3");
    //         if (line.length === bottom.length) {
    //           rect.setAttribute("height", String(getLegalValue(nodeRect.y - selectedRect.y - selectedRect.h)));
    //         }
    //         if (line.length === top.length) {
    //           rect.setAttribute("height", String(getLegalValue(selectedRect.y - nodeRect.y - nodeRect.h)));
    //         }
    //         this.g.append(rect);
    //       });
    //     }
    //   }
    // }
  }
}
