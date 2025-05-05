import { HookNames } from "./hook";
import { handle_pointer } from "./listener/pointer";
import { handle_wheel } from "./listener/wheel";
import { Observer } from "./observer";
import { hooks, Store } from "./store";
import d3 from "./utils/d3";

export function store_mount(this: Store) {
  this[hooks].execute(this, HookNames.onMountStart);
  const root = this.root.node() as Element;
  const board = this.board.node() as Element;
  const assist = this.assist.node() as Element;
  root.append(assist);
  const boardRect = board.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  this.root.attr("data-nodeType", "root").style("position", "relative");
  this.board
    .attr("data-type", "board")
    .style("position", "absolute")
    .style("left", `${(rootRect.width - boardRect.width) / 2}px`)
    .style("top", `${(rootRect.height - boardRect.height) / 2}px`)
    .style("transform-origin", "0 0");
  this.assist
    .attr("data-type", "assist")
    .attr("width", boardRect.width)
    .attr("height", boardRect.height)
    .attr("viewbox", [0, 0, boardRect.width, boardRect.height])
    .style("position", "absolute")
    .style("left", `${(rootRect.width - boardRect.width) / 2}px`)
    .style("top", `${(rootRect.height - boardRect.height) / 2}px`)
    .style("transform-origin", "0 0");
  this.observer = new Observer(root, board);

  handle_wheel(this);
  handle_pointer(this);
  this[hooks].execute(this, HookNames.onMountEnd);
}
