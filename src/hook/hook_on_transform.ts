import {hook, Store} from "@/store";
import {HookCallback, HookNames} from "@/hook/index";

export function hook_on_transform(this: Store, func: HookCallback) {
  this[hook].add(HookNames.onTransform, func);
}
