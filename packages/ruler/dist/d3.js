import { select as d3Select, pointer as d3Pointer, create as d3Create, } from "d3-selection";
import { drag as d3Drag } from "d3-drag";
import { axisBottom as d3AxisBottom, axisRight as d3AxisRight, } from "d3-axis";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
export default class d3 {
    static create = d3Create;
    static select = d3Select;
    static pointer = d3Pointer;
    static drag = d3Drag;
    static scaleLinear = d3ScaleLinear;
    static axisBottom = d3AxisBottom;
    static axisRight = d3AxisRight;
}
