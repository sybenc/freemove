import { _Ruler } from "./ruler";

export function ruler_line_remove(this: _Ruler, logic: number){
  this.lines.delete(logic);
  this.lineRender();
}