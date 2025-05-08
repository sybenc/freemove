import d3 from "../d3";
import { ruler_get_ticks_main } from "./ruler_get_ticks_main";
import { ruler_get_ticks_secondary } from "./ruler_get_ticks_secondary";
import { ruler_line_add } from "./ruler_line_add";
import { ruler_line_remove } from "./ruler_line_remove";
import { ruler_apply_transform } from "./ruler_apply_transform";
import { ruler_line_render } from "./ruler_line_render";
import { ruler_mount } from "./ruler_mount";
import { Tooltip } from "./tooltip";
import { ruler_mesh_mount } from "./ruler_mesh_mount";
import { ruler_mesh_unmount } from "./ruler_mesh_unmount";
import { ruler_mesh_render } from "./ruler_mesh_render";
import { ruler_slider_show } from "./ruler_slider_show";
import { ruler_slider_hidden } from "./ruler_slider_hidden";
import { ruler_slider_render } from "./ruler_slider_render";
export class _Ruler {
    type;
    svg;
    mesh;
    slider;
    width;
    height;
    lower;
    upper;
    scaleLinear;
    axis;
    lines = new Set();
    tooltip = new Tooltip();
    observer;
    __draggingLine = null;
    get __isX() {
        return this.type === "x";
    }
    getMainTicks = ruler_get_ticks_main;
    getSecondaryTicks = ruler_get_ticks_secondary;
    lineAdd = ruler_line_add;
    lineRemove = ruler_line_remove;
    lineRender = ruler_line_render;
    applyTransform = ruler_apply_transform;
    mount = ruler_mount;
    unmount = ruler_mount;
    meshMount = ruler_mesh_mount;
    meshUnmount = ruler_mesh_unmount;
    meshRender = ruler_mesh_render;
    sliderShow = ruler_slider_show;
    sliderHidden = ruler_slider_hidden;
    sliderRender = ruler_slider_render;
    constructor(type, observer) {
        this.observer = observer;
        const boardCoord = observer.boardCoord;
        const actualUpper = Math.max(this.observer.rootDOMRect.width, this.observer.rootDOMRect.height);
        const actualLower = 0;
        this.type = type;
        this.width = this.__isX ? actualUpper : 20;
        this.height = this.__isX ? 20 : actualUpper;
        this.lower = -boardCoord[type];
        this.upper = actualUpper - boardCoord[type];
        this.scaleLinear = d3.scaleLinear([this.lower, this.upper], [actualLower, actualUpper]);
        this.axis = (this.__isX ? d3.axisBottom(this.scaleLinear) : d3.axisRight(this.scaleLinear))
            .ticks(20)
            .tickSize(10)
            .tickPadding(4);
        this.svg = d3
            .create("svg:svg")
            .attr("viewbox", [0, 0, this.width, this.height])
            .attr("width", this.width)
            .attr("height", this.height)
            .style("background", "#DCDCAF")
            .style("position", "absolute")
            .style("left", 0)
            .style("top", 0)
            .call(this.axis);
        this.svg
            .on("mousemove", (event) => {
            const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
            this.tooltip
                .show()
                .fixed(this.__isX ? event.clientX + 4 : this.observer.rootDOMRect.left + 24, this.__isX ? this.observer.rootDOMRect.top + 24 : event.clientY + 4)
                .html(`${(this.__isX
                ? (Math.round(this.scaleLinear.invert(mouseX)) * 100) / this.observer.boardDOMRect.width
                : (Math.round(this.scaleLinear.invert(mouseY)) * 100) / this.observer.boardDOMRect.height).toFixed(2)}%`);
        })
            .on("mouseout", () => {
            this.tooltip.hidden();
        })
            .on("click", (event) => {
            const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
            this.lineAdd(this.__isX ? mouseX : mouseY);
        });
        this.mesh = d3
            .create("svg")
            .style("position", "absolute")
            .style("left", 0)
            .style("top", 0)
            .attr("viewBox", [0, 0, this.observer.rootDOMRect.width, this.observer.rootDOMRect.height].join(' '))
            .attr("width", this.observer.rootDOMRect.width)
            .attr("height", this.observer.rootDOMRect.height)
            .style("pointer-events", "none");
        this.slider = this.svg.append('rect');
        if (this.__isX) {
            this.svg.append("rect").attr("x", 0).attr("y", 0).attr("width", 20).attr("height", 20).attr("fill", "#DCDCB4");
        }
    }
}
