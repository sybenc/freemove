import {AlignLineData, AlignLineType} from "./type";
import {DomSelection} from "../d3";
import {Store} from "@sybenc/freemove-types";
import {alignTypes} from "./const";
import {align_compute} from "./align_compute";
import {align_absorb} from "./align_absorb";
import {align_draw} from "./align_draw";

export class Align {
  store: Store
  g: DomSelection;
  lines: Record<AlignLineType | "vertical", DomSelection>;
  alternate: AlignLineData[] = []

  constructor(store: Store) {
    this.store = store
    this.g = store.assist.append("g").attr("data-assist-type", "align").style("display", "block");
    this.lines = {} as any;
    [...alignTypes, "vertical"].forEach((type) => {
      this.lines[type as AlignLineType | "vertical"] = this.g.append("line").style("display", "none");
    });
  }

  render() {
    this.hidden()
    align_compute.call(this)
    align_absorb.call(this)
    align_draw.call(this)
  }

  mount() {
    this.store.assist.node().appendChild(this.g.node())
  }

  unmount() {
    this.g.remove()
  }

  hidden() {
    Object.values(this.lines).forEach(line => {
      line.style('display', 'none')
    })
  }
}