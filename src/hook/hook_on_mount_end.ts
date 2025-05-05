import { HookCallback, HookNames } from ".";
import { hooks, Store } from "../store";

export function hook_on_mount_start(this: Store, func: HookCallback) {
  this[hooks].add(HookNames.onMountStart, func);
}
