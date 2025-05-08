import {HookNames} from "@/hook/index";

export type HookCallback<T extends any[] = any[]> = (...args: T) => void | Promise<void>;

export class Hook {
  private storage: Map<HookNames, Set<HookCallback>> = new Map();

  add(name: HookNames, func: HookCallback) {
    if (this.storage.has(name)) {
      this.storage.get(name)?.add(func);
    } else {
      this.storage.set(name, new Set<HookCallback>().add(func));
    }
  }

  execute(name: HookNames, ...args: any[]) {
    if (!this.storage.has(name)) return;

    const callbacks = this.storage.get(name);
    if (!callbacks) return;

    callbacks.forEach((func) => {
      func(...args);
    });
  }

  async executeAsync(name: HookNames, ...args: any[]) {
    if (!this.storage.has(name)) return;

    const callbacks = this.storage.get(name);
    if (!callbacks) return;

    for (const func of callbacks) {
      await func(...args);
    }
  }
}

export {HookNames} from "./hook_names";