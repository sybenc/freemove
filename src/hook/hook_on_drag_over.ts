import {hook, Store} from "@/store";
import {HookCallback, HookNames} from "@/hook/index";

export function hook_on_drag_over(this: Store, func: HookCallback<[DragEvent]>) {
  this[hook].add(HookNames.onDragOver, func);
}
