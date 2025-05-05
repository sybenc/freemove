import { nanoid } from "nanoid";
import Rect from "./rect";

export function rect_clone(this: Rect){
  const newNode = this.node.clone()
  newNode.attr('data-id', nanoid())
  return Rect.from(newNode.node())
}