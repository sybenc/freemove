import {hook, Store} from "@/store";
import {HookCallback, HookNames} from "@/hook/index";

export function hook_on_mount_start(this: Store, func: HookCallback) {
  this[hook].add(HookNames.onMountStart, func);
}
