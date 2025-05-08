import { alignTypes } from "./const";
import { align_compute } from "./align_compute";
import { align_absorb } from "./align_absorb";
import { align_draw } from "./align_draw";
export class Align {
    store;
    g;
    lines;
    alternate = [];
    constructor(store) {
        this.store = store;
        this.g = store.assist.append("g").attr("data-assist-type", "align").style("display", "block");
        this.lines = {};
        [...alignTypes, "vertical"].forEach((type) => {
            this.lines[type] = this.g.append("line").style("display", "none");
        });
    }
    render() {
        this.hidden();
        align_compute.call(this);
        align_absorb.call(this);
        align_draw.call(this);
    }
    mount() {
        this.store.assist.node().appendChild(this.g.node());
    }
    unmount() {
        this.g.remove();
    }
    hidden() {
        Object.values(this.lines).forEach(line => {
            line.style('display', 'none');
        });
    }
}
