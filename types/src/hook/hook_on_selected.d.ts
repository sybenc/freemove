import { Store } from "@/store";
import { HookCallback } from "@/hook/index";
export declare function hook_on_selected(this: Store, func: HookCallback<[number, number]>): void;
