import { HookNames } from "../../hook";
import { CommandMoveRect } from "../../manager/command/command_move_rect";
import { hooks, Store } from "../../store";

export function handle_move(store: Store, event: PointerEvent) {
  const boardRect = store.observer.boardDOMRect;
  const rect = store.selectedRect.node.node().getBoundingClientRect();
  const scale = store.transform.scale;
  const start = {
    x: (event.clientX - rect.left) / scale,
    y: (event.clientY - rect.top) / scale,
  };
  const snapshot = {
    x: store.selectedRect.x,
    y: store.selectedRect.y,
  };
  const value = Object.assign({}, snapshot);
  store[hooks].execute(store, HookNames.onMoveRectStart, value.x, value.y);

  function move(ev: PointerEvent) {
    if (!store.selectedRect) return;
    value.x = Math.round((ev.clientX - boardRect.left) / scale - start.x);
    value.y = Math.round((ev.clientY - boardRect.top) / scale - start.y);

    const maxLeft = boardRect.width - store.selectedRect.w;
    const maxTop = boardRect.height - store.selectedRect.h;

    value.x = Math.max(0, Math.min(value.x, maxLeft));
    value.y = Math.max(0, Math.min(value.y, maxTop));

    store[hooks].execute(store, HookNames.onMoveRect, value.x, value.y);

    const commandMove = new CommandMoveRect(store.selectedRect, value, snapshot);
    commandMove.record = false;
    store.manager.execute(commandMove);
  }

  function stop() {
    const commandMove = new CommandMoveRect(store.selectedRect, value, snapshot);
    store.manager.execute(commandMove);
    store[hooks].execute(store, HookNames.onMoveRectEnd, value.x, value.y);
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", stop);
  }

  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", stop);
}
