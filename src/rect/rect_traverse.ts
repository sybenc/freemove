import Rect from "./rect";

export function rect_traverse(
  rect: Rect,
  callback: (item: Rect, depth: number) => void,
  algorithm: "bfs" | "dfs" = "dfs",
  depth: number = 0
) {
  if (algorithm === "dfs") {
    callback(rect, depth);
    for (const child of rect.children) {
      rect_traverse(child, callback, "dfs", depth + 1);
    }
  }
  if (algorithm === "bfs") {
    const queue = new Array<{
      rect: Rect;
      depth: number;
    }>();
    queue.unshift({ rect: rect, depth: depth });
    while (!queue.length) {
      const { rect, depth } = queue.shift()!;
      callback(rect, depth);
      for (const child of rect.children) {
        queue.unshift({ rect: child, depth: depth + 1 });
      }
    }
  }
}
