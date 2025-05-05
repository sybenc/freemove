import d3, { DomSelection } from "./utils/d3";
import { Rect } from "./rect";
import { Observer } from "./observer";
import { Transform } from "./transform";
import { store_search_error } from "./store_search_error";
import { store_apply_transform } from "./store_apply_transform";
import { Manager } from "./manager";
import { store_plugin } from "./store_plugin";
import { Plugins } from "./plugins";
import { store_mount } from "./store_mount";
import { Ruler, ruler } from "@sybenc/ruler";
import { hook_on_move_rect } from "./hook/hook_on_move_rect";
import { Hook, HookNames } from "./hook";
import { hook_on_transform } from "./hook/hook_on_transform";
import { hook_on_mount_start } from "./hook/hook_on_mount_end";
import { hook_on_mount_end } from "./hook/hook_on_mount_start";
import { hook_on_move_rect_end } from "./hook/hook_on_move_rect_end";
import { hook_on_move_rect_start } from "./hook/hook_on_move_rect_start";
import { hook_on_selected } from "./hook/hook_on_selected";

export const hooks = Symbol("hooks");
export const plugin = Symbol("plugin");

export class Store {
  root: DomSelection;
  board: DomSelection;
  assist: DomSelection;
  transform: Transform;
  observer!: Observer;
  rect: Rect;
  manager: Manager;
  ruler?: Ruler;

  #selectedRect: Rect;
  get selectedRect(): Rect {
    return this.#selectedRect;
  }

  set selectedRect(rect: Rect) {
    this.#selectedRect = rect;
    this[hooks].execute(this, HookNames.onSelected);
    this.searchError();
  }

  [hooks]: Hook;
  [plugin]: Plugins;

  searchError = store_search_error;
  applyTransform = store_apply_transform;
  plugin = store_plugin;
  mount = store_mount;

  onTransform = hook_on_transform;
  onMountStart = hook_on_mount_start;
  onMountEnd = hook_on_mount_end;
  onMoveRect = hook_on_move_rect;
  onMoveRectEnd = hook_on_move_rect_end;
  onMoveRectStart = hook_on_move_rect_start;
  onSelected = hook_on_selected

  constructor(root: HTMLElement, board: HTMLElement) {
    this.root = d3.select(root);
    this.board = d3.select(board);
    this.assist = d3.create("svg:svg");
    this.rect = Rect.from(board);
    this.#selectedRect = this.rect;
    this[hooks] = new Hook();
    this[plugin] = new Plugins();
    this.transform = new Transform(1, 0, 0);
    this.manager = new Manager();
    this.plugin(ruler);
  }
}
