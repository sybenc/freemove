import { Store } from "../store";
import { HookNames } from "./hook_names";
export type HookCallback = (this: Store, ...args: any[]) => void;
export declare class Hook {
    private storage;
    add(name: HookNames, func: HookCallback): void;
    execute(store: Store, name: HookNames, ...args: any[]): void;
}
export { HookNames } from "./hook_names";
export { hook_on_after_transform } from "./hook_on_after_transform";
export { hook_on_before_mount as hook_on_before_init } from "./hook_on_before_mount";
export { hook_on_after_mount as hook_on_after_init } from "./hook_on_after_mount";
