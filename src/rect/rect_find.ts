import Rect from "./rect";

export function rect_find(
  this: Rect,
  predicate: (item: Rect) => boolean,
  algorithm: "bfs" | "dfs" = "dfs"
): Rect | null {
  if (algorithm === "dfs") {
    if (predicate(this)) return this;
    for (const child of this.children) {
      const result = child.find(predicate, "dfs");
      if (result) return result;
    }
    return null;
  } else {
    const queue = new Array<Rect>();
    queue.unshift(this);
    while (!queue.length) {
      const node = queue.shift();
      if (predicate(node!)) {
        return node!;
      }
      queue.unshift(...node!.children);
    }
    return null;
  }
}
