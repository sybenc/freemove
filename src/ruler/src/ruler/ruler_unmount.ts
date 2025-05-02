import { _Ruler } from "./ruler";

export function ruler_mount(this: _Ruler){
  this.svg.remove()
  this.tooltip.unmount()
}