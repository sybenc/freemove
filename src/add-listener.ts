import { NODE_CLASS_PREFIX, NODE_MIM_HEIGHT, NODE_MIN_WIDTH } from "./const";
import Rect from "./rect";
import { Store } from "./store";
import { toPx } from "./utils";

function handleMoveNode(store: Store, event: MouseEvent) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  store.alignLine.reRender(store);
  const rect = store.selected.getBoundingClientRect();
  let startX = event.clientX - rect.left;
  let startY = event.clientY - rect.top;

  let animationFrameId: number | null = null;

  // 存储上一次偏移的位置，判断用户移动方向
  let prevX: number | null = null;
  let prevY: number | null = null;

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

      // 计算偏移量
      store.moveDelta = [prevX !== null ? newX - prevX : 0, prevY !== null ? newY - prevY : 0];

      store.selected.style.left = toPx(newX);
      store.selected.style.top = toPx(newY);
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
    store.alignLine.hidden();

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

  const rect = store.selected.getBoundingClientRect();
  let startX = event.clientX;
  let startY = event.clientY;
  let startWidth = rect.width;
  let startHeight = rect.height;
  let startLeft = rect.left - containerRect.left;
  let startTop = rect.top - containerRect.top;

  function resize(ev: PointerEvent) {
    let deltaX = ev.clientX - startX;
    let deltaY = ev.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeft = startLeft;
    let newTop = startTop;

    if (direction!.includes("right")) {
      newWidth = Math.max(10, startWidth + deltaX);
    }
    if (direction!.includes("left")) {
      newWidth = Math.max(10, startWidth - deltaX);
      newLeft = startLeft + deltaX;
    }
    if (direction!.includes("bottom")) {
      newHeight = Math.max(10, startHeight + deltaY);
    }
    if (direction!.includes("top")) {
      newHeight = Math.max(10, startHeight - deltaY);
      newTop = startTop + deltaY;
    }

    if (newHeight > NODE_MIM_HEIGHT) {
      store.selected!.style.height = toPx(newHeight);
      store.selected!.style.top = toPx(newTop);
    }
    if (newWidth > NODE_MIN_WIDTH) {
      store.selected!.style.width = toPx(newWidth);
      store.selected!.style.left = toPx(newLeft);
    }
    
    store.seletedBorder.reRender(store);
  }

  function stopResize() {
    document.removeEventListener("pointermove", resize);
    document.removeEventListener("pointerup", stopResize);
  }

  document.addEventListener("pointermove", resize);
  document.addEventListener("pointerup", stopResize);
}

export function addPointerListener(store: Store) {
  store.svg.addEventListener("pointerdown", (event: PointerEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

    // 如果点击啊到被选择边框的resize点
    if (target.classList[0].includes(`${NODE_CLASS_PREFIX}-selected-border-point-`)) {
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

    console.log(1111);
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
        store.setSelected(seleted.node);
        handleMoveNode(store, event);
      }

      // todo: 此外，绘画选择框
      if (!seleted) {
      }
    }
  });
}
