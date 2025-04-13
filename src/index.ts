import { CLASS_PREFIX } from "./const";
import Rect from "./rect";
import { initStore, Store } from "./store";
import { toPx } from "./utils";

let store: Store;

export default function createFreeMove(container: HTMLElement, nodes: HTMLElement[]) {
  store = initStore(container, nodes);
  store.svg.addEventListener("pointerdown", (e: PointerEvent) => {
    const containerRect = store.container.getBoundingClientRect();
    e.preventDefault();

    let seleted: Rect | null = null;

    for (const node of store.nodes) {
      const nodeRect = Rect.from(node);
      if (nodeRect.isInSide({ x: e.offsetX, y: e.offsetY })) {
        seleted = nodeRect;
        break;
      }
    }

    if (!seleted) return;

    const selectedDom = seleted.node;
    store.setSelected(seleted.node);
    store.alignLine.reRender(store);

    if (
      selectedDom.classList.contains(`${CLASS_PREFIX}-container`) ||
     !selectedDom.classList.contains(`${CLASS_PREFIX}-movable-node`)
    ) return;

    const rect = selectedDom.getBoundingClientRect();
    let startX = e.clientX - rect.left;
    let startY = e.clientY - rect.top;

    let animationFrameId: number | null = null;

    // 存储上一次偏移的位置，判断用户移动方向
    let prevX: number | null = null;
    let prevY: number | null = null;

    function handlePointerMove(ev: PointerEvent) {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        let newX = ev.clientX - containerRect.left - startX;
        let newY = ev.clientY - containerRect.top - startY;

        const maxLeft = store.container.clientWidth - selectedDom.offsetWidth;
        const maxTop = store.container.clientHeight - selectedDom.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxLeft));
        newY = Math.max(0, Math.min(newY, maxTop));

        // 计算偏移量
        store.moveDelta = [prevX !== null ? newX - prevX : 0, prevY !== null ? newY - prevY : 0];

        selectedDom.style.left = toPx(newX);
        selectedDom.style.top = toPx(newY);
        store.alignLine.reRender(store);
        store.seletedBorder.reRender(store);

        // 存储该次坐标
        prevX = newX;
        prevY = newY;
        animationFrameId = null;
      });
    }

    function handlePointerUp() {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      store.alignLine.clear();

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  });

  return store.svg;
}
