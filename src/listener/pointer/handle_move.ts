import {HookNames} from "@/hook";
import {CommandMoveRect} from "@/manager";
import {hook, Store} from "@/store";

export function handle_move(store: Store, event: PointerEvent) {
  const boardRect = store.observer.boardDOMRect;
  const rect = store.selectedRect.node.node().getBoundingClientRect();
  const scale = store.transform.scale;
  const start = {
    x: (event.clientX - rect.left) / scale,
    y: (event.clientY - rect.top) / scale,
  };
  // 上一次的坐标
  const last = {
    x: store.selectedRect.x,
    y: store.selectedRect.y,
  };
  // 现在的坐标
  const curr = Object.assign({}, last);
  // 留存的起始位置
  const snapshot = Object.assign({}, last);
  store[hook].execute(HookNames.onMoveRectStart);

  function move(ev: PointerEvent) {
    if (!store.selectedRect) return;
    curr.x = Math.round((ev.clientX - boardRect.left) / scale - start.x);
    curr.y = Math.round((ev.clientY - boardRect.top) / scale - start.y);

    const maxLeft = boardRect.width / scale - store.selectedRect.w;
    const maxTop = boardRect.height / scale - store.selectedRect.h;

    curr.x = Math.max(0, Math.min(curr.x, maxLeft));
    curr.y = Math.max(0, Math.min(curr.y, maxTop));

    store.selectedRect.x = curr.x
    store.selectedRect.y = curr.y
    store[hook].execute(HookNames.onMoveRect, {
      dx: curr.x - last.x,
      dy: curr.y - last.y
    });

    last.x = curr.x
    last.y = curr.y
  }

  function stop() {
    const commandMove = new CommandMoveRect(store.selectedRect, {
      x: store.selectedRect.x,
      y: store.selectedRect.y
    }, snapshot);
    store.manager.execute(commandMove);
    store[hook].execute(HookNames.onMoveRectEnd);
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", stop);
  }

  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", stop);
}
