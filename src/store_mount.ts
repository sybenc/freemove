import {HookNames} from "@/hook";
import {handle_pointer} from "@/listener/pointer";
import {handle_wheel} from "@/listener/wheel";
import {Observer} from "@/observer";
import {hook, Store} from "@/store";
import {handle_drag} from "@/listener/drag";
import {ruler} from "@sybenc/ruler";
import {assistAlign} from "@sybenc/assist-align";

export function store_mount(this: Store) {
  this[hook].execute(HookNames.onMountStart);
  const root = this.root.node() as Element;
  const board = this.board.node() as Element;
  const assist = this.assist.node() as Element;
  root.append(assist);
  const boardRect = board.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  this.root.attr("data-type", "root").style("position", "relative");
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
      .attr("viewBox", [0, 0, boardRect.width, boardRect.height].join(' '))
      .style("position", "absolute")
      .style("left", `${(rootRect.width - boardRect.width) / 2}px`)
      .style("top", `${(rootRect.height - boardRect.height) / 2}px`)
      .style("transform-origin", "0 0");
  this.observer = new Observer(root, board);

  handle_wheel(this);
  handle_pointer(this);
  handle_drag(this)
  this.plugin(assistAlign).plugin(ruler)
      ;
  this[hook].execute(HookNames.onMountEnd);
}
