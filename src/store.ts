import d3, {DomSelection} from "@utils/d3";
import {Transform} from "@/transform";
import {Observer} from "@/observer";
import {Rect} from "@/rect";
import {Manager} from "@/manager";
import {Hook, HookNames} from "@/hook";
import {Plugins} from "@/plugins";
import {store_search_error} from "@/store_search_error";
import {store_apply_transform} from "@/store_apply_transform";
import {store_plugin} from "@/store_plugin";
import {store_mount} from "@/store_mount";
import {hook_on_transform} from "@/hook/hook_on_transform";
import {hook_on_mount_start} from "@/hook/hook_on_mount_start";
import {hook_on_move_rect} from "@/hook/hook_on_move_rect";
import {hook_on_mount_end} from "@/hook/hook_on_mount_end";
import {hook_on_move_rect_end} from "@/hook/hook_on_move_rect_end";
import {hook_on_move_rect_start} from "@/hook/hook_on_move_rect_start";
import {hook_on_selected} from "@/hook/hook_on_selected";
import {hook_on_drop} from "@/hook/hook_on_drop";
import {hook_on_drag_over} from "@/hook/hook_on_drag_over";
import {hook_on_drag_leave} from "@/hook/hook_on_drag_leave";
import {store_plugin_data} from "@/store_plugin_data";

export const hook = Symbol("hooks");
export const plugins = Symbol("plugin");

export class Store {
  root: DomSelection;
  board: DomSelection;
  assist: DomSelection;
  transform: Transform;
  observer!: Observer;
  rect: Rect;
  manager: Manager;

  #selectedRect: Rect;
  get selectedRect(): Rect {
    return this.#selectedRect;
  }

  set selectedRect(rect: Rect) {
    rect.node.raise()
    this.#selectedRect = rect;
    this[hook].execute(HookNames.onSelected);
    this.searchError();
  }

  [hook]: Hook;
  [plugins]: Plugins;

  searchError = store_search_error;
  applyTransform = store_apply_transform;
  plugin = store_plugin;
  pluginData = store_plugin_data;
  mount = store_mount;

  onTransform = hook_on_transform;
  onMountStart = hook_on_mount_start;
  onMountEnd = hook_on_mount_end;
  onMoveRect = hook_on_move_rect;
  onMoveRectEnd = hook_on_move_rect_end;
  onMoveRectStart = hook_on_move_rect_start;
  onSelected = hook_on_selected;
  onDrop = hook_on_drop;
  onDragOver = hook_on_drag_over;
  onDragLeave = hook_on_drag_leave;

  constructor(root: HTMLElement, board: HTMLElement) {
    this.root = d3.select(root);
    this.board = d3.select(board);
    this.assist = d3.create("svg:svg");
    this.rect = Rect.from(board);
    this.#selectedRect = this.rect;
    this[hook] = new Hook();
    this[plugins] = new Plugins();
    this.transform = new Transform(1, 0, 0);
    this.manager = new Manager();
  }
}
