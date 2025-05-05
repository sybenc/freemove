import { Store } from "../../store";

export function handle_wheel(store: Store) {
  store.root.node().addEventListener("wheel", (event: WheelEvent) => {
    event.preventDefault();
    const [minScale, maxScale] = store.transform.scaleExtent;
    if (event.ctrlKey) {
      // 缩放操作
      const rect = store.board.node().getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const scale = store.transform.scale;

      // 计算缩放增量
      const zoomDelta = event.deltaY * -0.01;
      let newScale = scale * (1 + zoomDelta);
      newScale = Math.max(minScale, Math.min(maxScale, newScale));

      // 调整平移以保持鼠标位置固定
      store.transform.translateX -= (mouseX / scale - mouseX / newScale) * newScale;
      store.transform.translateY -= (mouseY / scale - mouseY / newScale) * newScale;
      store.transform.scale = newScale;
      store.applyTransform();
    } else {
      // 平移操作
      store.transform.translateX -= event.deltaX;
      store.transform.translateY -= event.deltaY;
      store.applyTransform();
    }
  });
}
