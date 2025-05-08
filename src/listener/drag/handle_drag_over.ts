import {hook, Store} from "@/store";
import {HookNames} from "@/hook";

export function handle_drag_over(store: Store) {
  store.assist.on("dragover", (event: DragEvent)=>{
    store[hook].execute(HookNames.onDragOver, event)
  })
}