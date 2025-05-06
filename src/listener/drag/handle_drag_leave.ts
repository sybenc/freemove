import {hook, Store} from "@/store";
import {HookNames} from "@/hook";

export function handle_drag_leave(store: Store) {
  store.assist.on("dragleave", (event: DragEvent)=>{
    store[hook].execute(store, HookNames.onDragLeave, event)
  })
}