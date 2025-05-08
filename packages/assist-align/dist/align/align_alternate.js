import { getRectAlign } from "./utils";
import { alignTypes } from "./const";
// 计算可能被吸附的所有数据
export function align_alternate() {
    const store = this.store;
    const selected = store.selectedRect;
    const rects = selected.parent?.children;
    if (!rects)
        return;
    // 查找前，清空备选数据
    alignTypes.forEach((type) => (this.alternate[type] = []));
    rects.forEach(rect => {
        if (selected.isIntersect(rect))
            return;
        const selectedRectAlign = getRectAlign(selected);
        alignTypes.forEach(type => {
            let start, end, diff;
            // 水平方向上
            if (/^h/.test(type)) {
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
                const allY = [rect.y, rect.y + rect.h / 2, rect.y + rect.h];
                // 计算符合条件的对齐线
                allY.forEach(y => {
                    diff = Math.abs(selectedRectAlign[type] - y);
                    if (diff <= 3) {
                        this.alternate[type].push({
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
            if (/^v/.test(type)) {
                if (selected.y > rect.y + rect.h) {
                    start = selected.y + selected.h;
                    end = rect.y;
                }
                else if (selected.y + selected.h < rect.y) {
                    start = selected.y;
                    end = rect.y + rect.h;
                }
                else {
                    start = Math.min(selected.y, rect.y);
                    end = Math.max(selected.y + selected.h, rect.y + rect.h);
                }
                const allX = [rect.x, rect.x + rect.w / 2, rect.x + rect.w];
                allX.forEach(x => {
                    diff = Math.abs(selectedRectAlign[type] - x);
                    if (diff <= 3) {
                        this.alternate[type].push({
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
        // 当一条对齐线线上有多个矩形，会发现对齐线没有延伸到所有的矩形上
        // 找到对齐线的最小值和最大值，将所有相同diff值的对齐线的起始位置和终止位置都改为最小值和最大值
        // 找到最小diff值的对齐线，构造成唯一要渲染的对齐线
        alignTypes.forEach(type => {
            const map = new Map();
            const alternate = this.alternate[type];
            alternate.forEach((item) => {
                const arr = map.get(item.diff) || [];
                arr.push(item);
                map.set(item.diff, arr);
            });
            map.forEach(group => {
                let min = Infinity, max = 0;
                group.forEach(item => {
                    min = Math.min(min, item.start, item.end);
                    max = Math.max(max, item.start, item.end);
                });
                group.forEach(item => {
                    item.start = min;
                    item.end = max;
                });
            });
            const minDiff = Math.min(...map.keys());
            if (map.has(minDiff)) {
                const arr = map.get(minDiff);
                if (arr) {
                    this.alternate[type] = arr.length === 0 ? [] : [arr[0]];
                }
            }
        });
    });
}
