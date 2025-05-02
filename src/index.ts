import { Store } from "./store";
import "./style.css";
import d3 from "./ruler/src/d3";

export default class FreeMove {
  store: Store;

  constructor(root: HTMLElement, board: HTMLElement) {
    this.store = new Store(root, board);
    console.log(this.store);
  }

  mount() {
    this.store.board.append(this.store.svg);
  }

  unmount() {
    this.store.svg.remove();
  }
}


// export default dom