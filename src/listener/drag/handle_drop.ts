import {hook, Store} from "@/store";
import {HookNames} from "@/hook";

export function handle_drop(store: Store) {
  store.assist.on("drop", (event: DragEvent)=>{
    store[hook].execute(store, HookNames.onDrop, event)
  })
}