import { HookCallback, HookNames } from ".";
import { hooks, Store } from "../store";

export function hook_on_move_rect_end(this: Store, func: HookCallback<[number, number]>) {
  this[hooks].add(HookNames.onMoveRectEnd, func);
}
