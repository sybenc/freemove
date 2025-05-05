import { RectType } from ".";
import { DomSelection } from "../utils/d3";

export function rect_is_board(node: DomSelection){
  return node.attr('data-type') === RectType.Board
}