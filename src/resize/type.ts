import Rect from "../rect"

export interface ResizeData {
  type: 'height' | 'width'
  nodeRect: Rect
}