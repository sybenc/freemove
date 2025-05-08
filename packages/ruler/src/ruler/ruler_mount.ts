import { _Ruler } from "./ruler";

export function ruler_mount(this: _Ruler){
  this.observer.root.append(this.svg.node())
  this.tooltip.mount()
}