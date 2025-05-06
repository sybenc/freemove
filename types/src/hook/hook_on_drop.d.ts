import { Store } from "@/store";
import { HookCallback } from "@/hook/index";
export declare function hook_on_drop(this: Store, func: HookCallback<[DragEvent]>): void;
