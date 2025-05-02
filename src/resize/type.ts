import Node from "../rect"

export interface ResizeData {
  type: 'height' | 'width'
  nodeRect: Node
}