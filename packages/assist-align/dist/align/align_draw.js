export function align_draw() {
    const store = this.store;
    // 容器吸附
    const selected = store.selectedRect;
    if (!selected.parent)
        return;
    const container = selected.parent;
    this.alternate.forEach(item => {
        const { start, end, type } = item;
        const line = this.lines[type];
        if (/^h/.test(type)) {
            line.attr('x1', start)
                .attr('x2', end);
            switch (type) {
                case "ht":
                    line.attr('y1', selected.y).attr('y2', selected.y);
                    break;
                case "hc":
                    line.attr('y1', selected.y + selected.h / 2).attr('y2', selected.y + selected.h / 2);
                    break;
                case "hb":
                    line.attr('y1', selected.y + selected.h).attr('y2', selected.y + selected.h);
                    break;
            }
        }
        if (/^v/.test(type)) {
            line.attr('y1', start)
                .attr('y2', end);
            switch (type) {
                case "vl":
                    line.attr('x1', selected.x).attr('x2', selected.x);
                    break;
                case "vc":
                    line.attr('x1', selected.x + selected.w / 2).attr('x2', selected.x + selected.w / 2);
                    break;
                case "vr":
                    line.attr('x1', selected.x + selected.w).attr('x2', selected.x + selected.w);
                    break;
            }
        }
        line.attr('stroke-width', 1 / store.transform.scale)
            .attr('stroke', 'red')
            .style('display', 'block');
    });
}
