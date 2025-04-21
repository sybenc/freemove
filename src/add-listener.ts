import { ClassPrefix, NodeMinHeight, NodeMinWidth } from "./const";
import Rect from "./rect";
import { Store } from "./store";
import { toPx } from "./utils";

function handleMoveNode(store: Store, event: PointerEvent) {
  if (!store.selected) return;
  const canvasRect = store.canvas.getBoundingClientRect();

  if (store.selected.dataset.error === "false") {
    store.align.reRender(store);
    store.distance.reRender(store);
    store.gap.reRender(store);
  }
  store.border.reRender(store);
  const rect = store.selected.getBoundingClientRect();
  let startX = (event.clientX - rect.left) / store.scale;
  let startY = (event.clientY - rect.top) / store.scale;

  let animationFrameId: number | null = null;

  function handlePointerMove(ev: PointerEvent) {
    if (animationFrameId) return;

    animationFrameId = requestAnimationFrame(() => {
      if (!store.selected) return;
      let newX = (ev.clientX - canvasRect.left) / store.scale - startX;
      let newY = (ev.clientY - canvasRect.top) / store.scale - startY;

      const maxLeft = store.canvas.clientWidth - store.selected.offsetWidth;
      const maxTop = store.canvas.clientHeight - store.selected.offsetHeight;

      newX = Math.max(0, Math.min(newX, maxLeft));
      newY = Math.max(0, Math.min(newY, maxTop));

      store.selected.style.left = toPx(newX);
      store.selected.style.top = toPx(newY);
      store.searchError();
      if (store.selected.dataset.error === "false") {
        store.align.reRender(store);
        store.distance.reRender(store);
        store.gap.reRender(store);
      }
      store.border.reRender(store);

      animationFrameId = null;
    });
  }

  function handlePointerUp() {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    store.align.hidden();
    store.distance.hidden();
    store.gap.clear();

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
  const canvasRect = store.canvas.getBoundingClientRect();
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

  const canvasWidth = canvasRect.width;
  const canvasHeight = canvasRect.height;

  function resize(ev: PointerEvent) {
    let deltaX = (ev.clientX - startX) / store.scale;
    let deltaY = (ev.clientY - startY) / store.scale;

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
    if (newLeft + newWidth > canvasWidth / store.scale) {
      newWidth = canvasWidth / store.scale - newLeft;
    }
    if (newTop + newHeight > canvasHeight / store.scale) {
      newHeight = canvasHeight / store.scale - newTop;
    }

    // 限制最小尺寸
    newWidth = Math.max(newWidth, NodeMinWidth);
    newHeight = Math.max(newHeight, NodeMinHeight);

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
  const canvasRect = store.canvas.getBoundingClientRect();
  const startX = (event.clientX - canvasRect.left) / store.scale;
  const startY = (event.clientY - canvasRect.top) / store.scale;

  function select(ep: PointerEvent) {
    const endX = (ep.clientX - canvasRect.left) / store.scale;
    const endY = (ep.clientY - canvasRect.top) / store.scale;
    store.selector.reRender(store, startX, startY, endX, endY);
    store.selector.showPreview();
  }

  function stopSelect() {
    store.selector.hiddenSelector();
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
    if (target.classList[0].includes(`${ClassPrefix}-border-point-`)) {
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
    if (target.classList.contains(`${ClassPrefix}-svg`)) {
      // 判断点击位置是否在某个节点内部
      let selected: Rect | null = null;

      // 查找被点击的节点
      for (const node of store.nodes) {
        const nodeRect = Rect.from(node);
        if (nodeRect.isInSide({ x: event.offsetX, y: event.offsetY })) {
          selected = nodeRect;
          break;
        }
      }

      // 如果点击到节点，处理节点拖拽动作
      if (selected && selected.node.classList.contains(`${ClassPrefix}-movable-node`)) {
        store.selector.hiddenPreview();
        store.setSelected(selected.node);
        store.searchError();
        handleMoveNode(store, event);
      }

      // 此外，绘画选择框、清除被选择节点选择边框
      if (!selected) {
        store.border.hidden();
        store.selected = null;
        handleSelector(store, event);
      }
    }
  });

  // 滚轮事件监听，用于画布缩放
  store.board.addEventListener("wheel", (event: WheelEvent) => {
    event.preventDefault();
    const [minScale, maxScale] = store.scaleRange;

    function applyTransform() {
      store.canvas.style.transform = `translate(${store.translateX}px, ${store.translateY}px) scale(${store.scale})`;
      store.canvas.style.transformOrigin = "0 0";
      store.border.reRender(store);
    }

    if (event.ctrlKey) {
      // 缩放操作
      const rect = store.canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const beforeScaleX = offsetX / store.scale
      const beforeScaleY = offsetY / store.scale

      let zoomDelta = event.deltaY * -0.01;
      let newScale = store.scale + zoomDelta;
      newScale = Math.max(minScale, Math.min(maxScale, newScale));

      // 计算平移调整以保持鼠标位置固定
      store.scale = newScale
      const afterScaleX = offsetX / store.scale
      const afterScaleY = offsetY / store.scale

      const deltaX = (afterScaleX - beforeScaleX) * store.scale
      const deltaY = (afterScaleY - beforeScaleY) * store.scale
      store.translateX += deltaX
      store.translateY += deltaY
      // 更新缩放比例
      store.scale = newScale;
      applyTransform();
    } else {
      // 平移操作
      store.translateX -= event.deltaX;
      store.translateY -= event.deltaY;
      applyTransform();
    }
  });

  // store.svg.addEventListener('contextmenu', (event)=>{
  //   event.preventDefault()
  // })
}
