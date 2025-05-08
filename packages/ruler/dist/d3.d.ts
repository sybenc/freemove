import { select as d3Select, pointer as d3Pointer, create as d3Create, Selection } from "d3-selection";
import { drag as d3Drag } from "d3-drag";
import { axisBottom as d3AxisBottom, axisRight as d3AxisRight } from "d3-axis";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
export type DomSelection = Selection<any, any, any, any>;
export default class d3 {
    static create: typeof d3Create;
    static select: typeof d3Select;
    static pointer: typeof d3Pointer;
    static drag: typeof d3Drag;
    static scaleLinear: typeof d3ScaleLinear;
    static axisBottom: typeof d3AxisBottom;
    static axisRight: typeof d3AxisRight;
}
