import { Store } from "../store";
import { HookNames } from "./hook_names";

export type HookCallback<T extends any[] = any[]> = (this: Store, ...args: T) => void;

export class Hook {
  private storage: Map<HookNames, Set<HookCallback>> = new Map();

  add(name: HookNames, func: HookCallback) {
    if (this.storage.has(name)) this.storage.get(name)?.add(func);
    else this.storage.set(name, new Set<HookCallback>().add(func));
  }

  execute(store: Store, name: HookNames, ...args: any[]) {
    if (!this.storage.has(name)) return;
    this.storage.get(name)?.forEach((func) => {
      func.apply(store, args);
    });
  }
}
export { HookNames } from "./hook_names";