import d3 from "../d3";
import { _Ruler } from "./ruler";

export interface Transform {
  scale: number;
  translateX: number;
  translateY: number;
}

export function ruler_apply_transform(this: _Ruler, { scale, translateX, translateY }: Transform) {
  const translate = this.__isX ? translateX : translateY;
  const actualUpper = Math.max(this.width, this.height);
  const actualLower = 0;
  const upper = (this.lower - translate) / scale;
  const lower = (this.upper - translate) / scale;
  // 重新构造比例尺
  this.scaleLinear = d3.scaleLinear([upper, lower], [actualLower, actualUpper]);
  // 更新坐标轴
  this.axis.scale(this.scaleLinear);
  this.svg.call(this.axis);
  // 更新之后计算ticks
  const secondaryTicks = this.getSecondaryTicks();
  // 更新次级坐标轴
  this.svg.selectAll(`.ruler-secondary-tick`).remove();
  this.svg
    .append("svg:g")
    .lower()
    .classed(`ruler-secondary-tick`, true)
    .selectAll("line")
    .data(secondaryTicks)
    .join("svg:line")
    .attr("x1", (d) => (this.__isX ? d : 0))
    .attr("y1", (d) => (this.__isX ? 0 : d))
    .attr("x2", (d) => (this.__isX ? d : 5))
    .attr("y2", (d) => (this.__isX ? 5 : d))
    .attr("stroke", "#5EA090")
    .attr("stroke-width", "1")
    .style("pointer-events", "none");
  this.svg.selectAll(".tick").style("pointer-events", "none");
  this.svg
    .selectAll(".tick text")
    .attr("text-anchor", "start")
    .attr("transform", this.__isX ? "translate(4,-6)" : "rotate(90) translate(-10, -12)");
  this.lineRender();
  this.meshRender();
  this.svg.select(".domain").remove();
}
