import {
  select as d3Select,
  selectAll as d3SelectAll,
  pointer as d3Pointer,
  create as d3Create,
  Selection,
} from "d3-selection";
import { drag as d3Drag } from "d3-drag";
import { 
  axisTop as d3AxisTop,
  axisBottom as d3AxisBottom,
  axisRight as d3AxisRight,
  axisLeft as d3AxisLeft
 } from "d3-axis"
import { scaleLinear as d3ScaleLinear } from "d3-scale";
export type DomSelection = Selection<any, any, any, any>;

export default class d3 {
  static create = d3Create;
  static select = d3Select;
  static selectAll = d3SelectAll;
  static pointer = d3Pointer;
  static drag = d3Drag;
  static scaleLinear = d3ScaleLinear;
  static axisTop = d3AxisTop
  static axisBottom = d3AxisBottom
  static axisRight = d3AxisRight
  static axisLeft = d3AxisLeft
}
