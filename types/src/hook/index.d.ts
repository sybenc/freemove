import { Store } from "@/store";
import { HookNames } from "@/hook/index";
export type HookCallback<T extends any[] = any[]> = (store?: Store, ...args: T) => void;
export declare class Hook {
    private storage;
    add(name: HookNames, func: HookCallback): void;
    execute(store: Store, name: HookNames, ...args: any[]): void;
}
export { HookNames } from "./hook_names";
