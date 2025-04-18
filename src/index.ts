import { addPointerListener } from "./add-listener";
import Rect from "./rect";
import { initStore, Store } from "./store";
import { toPx } from "./utils";

export default class FreeMove {
  store: Store;

  constructor(container: HTMLElement, nodes: HTMLElement[]) {
    this.store = initStore(container, nodes);
    addPointerListener(this.store);
  }

  mount() {
    this.store.container.append(this.store.svg);
  }

  unmount() {
    this.store.svg.remove();
  }

  align(option: "start" | "center" | "end") {
    const { selected, container } = this.store;
    if (!selected) return;
    const containerRect = container.getBoundingClientRect();
    const selectedRect = Rect.from(selected);
    switch (option) {
      case "start":
        selected.style.left = toPx(0);
        break;
      case "center":
        selected.style.left = toPx(containerRect.width / 2 - selectedRect.w / 2);
        break;
      case "end":
        selected.style.left = toPx(containerRect.width - selectedRect.w);
        break;
      default:
        break;
    }
  }
}
