import d3 from "../d3";
import { _Ruler } from "./ruler";

export function ruler_mesh_render(this: _Ruler) {
  const mainTicks = this.getMainTicks();
  if (Math.abs(mainTicks[0] - mainTicks[1]) <= 10) {
    this.meshMount()
    const meshLength = this.__isX ? this.observer.rootDOMRect.height : this.observer.rootDOMRect.width;
    const secondaryTicks = this.getSecondaryTicks();
    this.mesh
      .selectAll("line")
      .data(secondaryTicks)
      .join("svg:line")
      .attr("x1", (d) => (this.__isX ? d : 0))
      .attr("y1", (d) => (this.__isX ? 0 : d))
      .attr("x2", (d) => (this.__isX ? d : meshLength))
      .attr("y2", (d) => (this.__isX ? meshLength : d))
      .attr("stroke", "#4DA5C9")
      .attr("stroke-width", 1);
  } else {
    this.meshUnmount()
  }
}
