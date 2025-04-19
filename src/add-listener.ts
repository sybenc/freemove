import { NODE_CLASS_PREFIX, NODE_MIN_HEIGHT, NODE_MIN_WIDTH } from "./const";
import Rect from "./rect";
import { Store } from "./store";
import { toPx } from "./utils";

function handleMoveNode(store: Store, event: PointerEvent) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  store.align.reRender(store);
  store.border.reRender(store);
  store.gap.reRender(store);
  store.distance.reRender(store);
  const rect = store.selected.getBoundingClientRect();
  let startX = event.clientX - rect.left;
  let startY = event.clientY - rect.top;

  let animationFrameId: number | null = null;

  function handlePointerMove(ev: PointerEvent) {
    if (animationFrameId) return;

    animationFrameId = requestAnimationFrame(() => {
      if (!store.selected) return;
      let newX = ev.clientX - containerRect.left - startX;
      let newY = ev.clientY - containerRect.top - startY;

      const maxLeft = store.container.clientWidth - store.selected.offsetWidth;
      const maxTop = store.container.clientHeight - store.selected.offsetHeight;

      newX = Math.max(0, Math.min(newX, maxLeft));
      newY = Math.max(0, Math.min(newY, maxTop));

      store.selected.style.left = toPx(newX);
      store.selected.style.top = toPx(newY);
      store.align.reRender(store);
      store.border.reRender(store);
      store.gap.reRender(store);
      store.distance.reRender(store);

      animationFrameId = null;
    });
  }

  function handlePointerUp() {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    store.align.hidden();
    store.distance.hidden();

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
}

function handleResizeNode(store: Store, event: PointerEvent) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  const target = event.target as HTMLElement;
  const direction = target.dataset.direction;
  if (!direction) return;

  const rect = Rect.from(store.selected);
  let startX = event.clientX;
  let startY = event.clientY;
  let startWidth = rect.w;
  let startHeight = rect.h;
  let startLeft = rect.x;
  let startTop = rect.y;

  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  function resize(ev: PointerEvent) {
    let deltaX = ev.clientX - startX;
    let deltaY = ev.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeft = startLeft;
    let newTop = startTop;

    if (direction!.includes("right")) {
      newWidth = startWidth + deltaX;
    }
    if (direction!.includes("left")) {
      newWidth = startWidth - deltaX;
      newLeft = startLeft + deltaX;
    }
    if (direction!.includes("bottom")) {
      newHeight = startHeight + deltaY;
    }
    if (direction!.includes("top")) {
      newHeight = startHeight - deltaY;
      newTop = startTop + deltaY;
    }

    // 限制不超出容器边界
    if (newLeft < 0) {
      newWidth += newLeft;
      newLeft = 0;
    }
    if (newTop < 0) {
      newHeight += newTop;
      newTop = 0;
    }
    if (newLeft + newWidth > containerWidth) {
      newWidth = containerWidth - newLeft;
    }
    if (newTop + newHeight > containerHeight) {
      newHeight = containerHeight - newTop;
    }

    // 限制最小尺寸
    newWidth = Math.max(newWidth, NODE_MIN_WIDTH);
    newHeight = Math.max(newHeight, NODE_MIN_HEIGHT);

    store.resize.reRender(store, newWidth, newHeight, direction!, startLeft, startTop, startWidth, startHeight);
    store.border.reRender(store);
  }

  function stopResize() {
    store.resize.hidden();
    document.removeEventListener("pointermove", resize);
    document.removeEventListener("pointerup", stopResize);
  }

  document.addEventListener("pointermove", resize);
  document.addEventListener("pointerup", stopResize);
}

function handleSelector(store: Store, event: PointerEvent) {
  const containerRect = store.container.getBoundingClientRect();
  const startX = event.clientX - containerRect.left;
  const startY = event.clientY - containerRect.top;

  function select(ep: PointerEvent) {
    const endX = ep.clientX - containerRect.left;
    const endY = ep.clientY - containerRect.top;
    store.selector.reRender(store, startX, startY, endX, endY);
  }

  function stopSelect() {
    store.selector.hiddenSelector();
    store.selector.showPreview();
    document.removeEventListener("pointermove", select);
    document.removeEventListener("pointerup", stopSelect);
  }

  document.addEventListener("pointermove", select);
  document.addEventListener("pointerup", stopSelect);
}

export function addPointerListener(store: Store) {
  store.svg.addEventListener("pointerdown", (event: PointerEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

    // 如果点击啊到被选择边框的resize点
    if (target.classList[0].includes(`${NODE_CLASS_PREFIX}-border-point-`)) {
      const ownerId = target.dataset.ownerId;
      for (let i = 0; i < store.nodes.length; i++) {
        if (ownerId === store.nodes[i].dataset.ownerId) {
          store.setSelected(store.nodes[i]);
        }
      }
      if (store.selected) {
        handleResizeNode(store, event);
      }
      return;
    }

    // 如果点击到svg画布
    if (target.classList.contains(`${NODE_CLASS_PREFIX}-svg`)) {
      // 判断点击位置是否在某个节点内部
      let seleted: Rect | null = null;

      // 查找被点击的节点
      for (const node of store.nodes) {
        const nodeRect = Rect.from(node);
        if (nodeRect.isInSide({ x: event.offsetX, y: event.offsetY })) {
          seleted = nodeRect;
          break;
        }
      }

      // 如果点击到节点，处理节点拖拽动作
      if (seleted && seleted.node.classList.contains(`${NODE_CLASS_PREFIX}-movable-node`)) {
        store.selector.hiddenPreview();
        store.setSelected(seleted.node);
        handleMoveNode(store, event);
      }

      // 此外，绘画选择框、清除被选择节点选择边框
      if (!seleted) {
        store.border.hidden();
        handleSelector(store, event);
      }
    }
  });
}
