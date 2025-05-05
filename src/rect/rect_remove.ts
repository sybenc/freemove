import Rect from "./rect";

export function rect_remove(this: Rect) {
  if (Rect.isBoard(this.node) || !this.parent) return
  this.node.remove()
  const parent = this.parent!
  const index = parent.children.findIndex((rect: Rect)=>rect.id === this.id)
  if (index !== -1) delete parent.children[index]
}


