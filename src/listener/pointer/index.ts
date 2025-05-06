import {Store} from "@/store";
import d3 from "@utils/d3";
import {Rect} from "@/rect";
import {handle_move} from "@/listener/pointer/handle_move";

export function handle_pointer(store: Store) {
  store.assist.on("pointerdown", (event: PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const target = d3.select(event.target as HTMLElement);
    const [mouseX, mouseY] = d3.pointer(event, store.assist.node());

    if (Rect.isAssist(target)) {
      // 判断点击位置是否在某个节点内部
      let selected: Rect | null = null;
      // 查找被点击的节点

      Rect.traverse(store.rect, (rect) => {
        if (rect.isInside({ x: mouseX, y: mouseY }) && Rect.isMovable(rect.node)) {
          selected = rect;
        }
      });

      if (selected) {
        store.selectedRect = selected;
        handle_move(store, event);
      }
    }
  });
}
