import { addPointerListener } from "./add-listener";
import { initStore, Store } from "./store";

export default function createFreeMove(container: HTMLElement, nodes: HTMLElement[]) {
  const store = initStore(container, nodes);
  addPointerListener(store)
  return store.svg;
}
