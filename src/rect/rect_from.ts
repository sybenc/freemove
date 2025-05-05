import Rect from "./rect";

// 从dom元素的style构建Rect对象
export function rect_from(node: HTMLElement): Rect {
  const computedStyle = getComputedStyle(node);
  const rectTree = new Rect({
    x: parseInt(computedStyle.left) || 0,
    y: parseInt(computedStyle.top) || 0,
    w: parseInt(computedStyle.width) || 0,
    h: parseInt(computedStyle.height) || 0,
    node,
  });
  if (Rect.isBoard(rectTree.node)) {
    rectTree.parent = null;
  }
  Array.from(node.children).forEach((child) => {
    const rectChild = rect_from(child as HTMLElement);
    rectChild.parent = rectTree;
    rectTree.children.push(rectChild);
  });
  return rectTree;
}
