import {hook, Store} from "@/store";
import {HookCallback, HookNames} from "@/hook/index";

export function hook_on_move_rect_start(this: Store, func: HookCallback<[number, number]>) {
  this[hook].add(HookNames.onMoveRectStart, func);
}
