import { _Ruler } from "./ruler";

export function ruler_mesh_mount(this: _Ruler){
  this.observer.root.append(this.mesh.node())
  this.mesh.lower()
}