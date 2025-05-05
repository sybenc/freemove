import {Store} from "./store";

export function store_search_error(this: Store) {
  if (!this.selectedRect || !this.selectedRect.parent) return;
  const nodeRects = this.selectedRect.parent.children;
  this.selectedRect.error = false;
  for (let i = 0; i < nodeRects.length; i++) {
    const nodeRect = nodeRects[i];
    if (nodeRect.id === this.selectedRect.id) continue; // 避免和自己比较

    const isIntersect = this.selectedRect.isIntersect(nodeRect);

    // 如果相交，标记两个都为 error
    if (isIntersect) {
      this.selectedRect.error = true;
      nodeRect.error = true;
      // this.align.hidden();
      // this.distance.hidden();
    } else {
      nodeRect.error = false;
    }
  }
}
