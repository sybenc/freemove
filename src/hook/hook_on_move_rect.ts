import {hook, Store} from "@/store";
import {HookCallback, HookNames} from "@/hook/index";

export function hook_on_move_rect(this: Store, func: HookCallback<[{
  dx: number,dy:number
}]>) {
  this[hook].add(HookNames.onMoveRect, func);
}
