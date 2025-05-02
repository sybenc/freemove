import { select as d3Select, selectAll as d3SelectAll, pointer as d3Pointer, create as d3Create, Selection } from "d3-selection";
import { drag as d3Drag } from "d3-drag";
import { axisTop as d3AxisTop, axisBottom as d3AxisBottom, axisRight as d3AxisRight, axisLeft as d3AxisLeft } from "d3-axis";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
export type DomSelection = Selection<any, any, any, any>;
export default class d3 {
    static create: typeof d3Create;
    static select: typeof d3Select;
    static selectAll: typeof d3SelectAll;
    static pointer: typeof d3Pointer;
    static drag: typeof d3Drag;
    static scaleLinear: typeof d3ScaleLinear;
    static axisTop: typeof d3AxisTop;
    static axisBottom: typeof d3AxisBottom;
    static axisRight: typeof d3AxisRight;
    static axisLeft: typeof d3AxisLeft;
}
