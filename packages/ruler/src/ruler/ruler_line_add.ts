import { _Ruler } from "./ruler";

export function ruler_line_add(this: _Ruler, actual: number){
  this.lines.add(Math.round(this.scaleLinear.invert(actual)));
  this.lineRender();
}