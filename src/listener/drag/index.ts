import {Store} from "@/store";
import {handle_drop} from "@/listener/drag/handle_drop";
import {handle_drag_over} from "@/listener/drag/handle_drag_over";
import {handle_drag_leave} from "@/listener/drag/handle_drag_leave";

export function handle_drag(store: Store){
  handle_drop(store)
  handle_drag_over(store)
  handle_drag_leave(store)
}