import { HookCallback, HookNames } from ".";
import { hooks, Store } from "../store";

export function hook_on_transform(this: Store, func: HookCallback) {
  this[hooks].add(HookNames.onTransform, func);
}
