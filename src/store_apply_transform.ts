import { HookNames } from "@/hook";
import { hook, Store } from "@/store";

export function store_apply_transform(this: Store) {
  this.board.style("transform", this.transform.toString());
  this.assist.style("transform", this.transform.toString());
  this.observer.update();
  this[hook].execute(this, HookNames.onTransform);
}
