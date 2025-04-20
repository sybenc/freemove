import { addPointerListener } from "./add-listener";
import Rect from "./rect";
import { initStore, Store } from "./store";
import { toPx } from "./utils";
import "./style.css";

export default class FreeMove {
  store: Store;

  constructor(border: HTMLElement, canvas: HTMLElement) {
    this.store = initStore(border, canvas);
    addPointerListener(this.store);
  }

  mount() {
    this.store.canvas.append(this.store.svg);
  }

  unmount() {
    this.store.svg.remove();
  }

  align(option: "start" | "center" | "end") {
    const { selected, canvas: container } = this.store;
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
