import Rect from "./rect";

export function rect_add_child(this: Rect, rect: Rect) {
  this.children.push(rect);
  this.node.append(rect.node.node())
}
