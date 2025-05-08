import {getRectAlign} from "./utils";
import {Align} from "./align";
import {alignTypes} from "./const";
import {AlignLineData, AlignLineType} from "./type";

// 计算可能被吸附的所有数据
export function align_compute(this: Align) {
  const {store} = this;
  const selected = store.selectedRect;
  const rects = selected.parent?.children;
  const alignmentLines: Record<AlignLineType, AlignLineData[]> = {
    ht: [], hc: [], hb: [], vl: [], vc: [], vr: []
  };
  if (!rects) return;

  // 计算所有可能的辅助线
  rects.forEach(rect => {
    if (selected.isIntersect(rect)) return;
    const selectedAlignPoints = getRectAlign(selected);

    alignTypes.forEach(type => {
      let start: number, end: number, diff: number;

      // 水平方向上
      if (type.startsWith('h')) {
        // 不同情况下，计算对齐线的起始位置和最终位置
        // 被选中矩形在目标右侧
        if (selected.x > rect.x + rect.w) {
          start = selected.x + selected.w;
          end = rect.x;
        }
        // 被选中矩形在目标左侧
        else if (selected.x + selected.w < rect.x) {
          start = selected.x;
          end = rect.x + rect.w;
        }
        // 被选中矩形和目标重合
        else {
          start = Math.min(selected.x, rect.x);
          end = Math.max(selected.x + selected.w, rect.x + rect.w);
        }
        // 目标元素在水平方向上的对齐线所有y值
        const yPoints = [rect.y, rect.y + rect.h / 2, rect.y + rect.h];
        // 计算符合条件的对齐线
        yPoints.forEach(y => {
          diff = Math.abs(selectedAlignPoints[type] - y);
          if (diff <= 3) {
            alignmentLines[type].push({
              type,
              start,
              end,
              diff,
              to: y,
              rects: [rect, selected]
            });
          }
        });
      }

      // 竖直方向上
      if (type.startsWith('v')) {
        if (selected.y > rect.y + rect.h) {
          start = selected.y + selected.h;
          end = rect.y;
        } else if (selected.y + selected.h < rect.y) {
          start = selected.y;
          end = rect.y + rect.h;
        } else {
          start = Math.min(selected.y, rect.y);
          end = Math.max(selected.y + selected.h, rect.y + rect.h);
        }
        const xPoints = [rect.x, rect.x + rect.w / 2, rect.x + rect.w];
        xPoints.forEach(x => {
          diff = Math.abs(selectedAlignPoints[type] - x);
          if (diff <= 3) {
            alignmentLines[type].push({
              type,
              start,
              end,
              diff,
              to: x,
              rects: [rect, selected]
            });
          }
        });
      }
    });

    // 找到最小diff值的对齐线，构造成唯一要渲染的对齐线
    alignTypes.forEach(type => {
      // 同类型辅助线映射
      const diffGroups = new Map<number, AlignLineData[]>();
      alignmentLines[type].forEach(line => {
        const group = diffGroups.get(line.diff) || [];
        group.push(line);
        diffGroups.set(line.diff, group);
      });

      diffGroups.forEach(group => {
        const bounds = group.reduce(
            ({min, max}, {start, end}) => ({
              min: Math.min(min, start, end),
              max: Math.max(max, start, end)
            }),
            {min: Infinity, max: 0}
        );

        group.forEach(line => {
          line.start = bounds.min;
          line.end = bounds.max;
        });
      });

      // 计算同类型辅助线最小diff
      const minDiff = Math.min(...diffGroups.keys());
      alignmentLines[type] = diffGroups.get(minDiff)?.[0] ? [diffGroups.get(minDiff)![0]] : [];
    });

    // 计算同方向辅助线最小diff
    const finalLines: AlignLineData[] = [];
    const minDiffH = Math.min(...[alignmentLines.hb, alignmentLines.hc, alignmentLines.ht].flat().map(line => line.diff));
    const minDiffV = Math.min(...[alignmentLines.vl, alignmentLines.vr, alignmentLines.vc].flat().map(line => line.diff));
    Object.values(alignmentLines).flat().forEach(line => {
      if ([minDiffH, minDiffV].includes(line.diff)) finalLines.push(line);
    });

    this.alternate = finalLines;
  });
}