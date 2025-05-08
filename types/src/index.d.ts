import { DomSelection as DomSelection_2 } from '@sybenc/ruler/dist/d3';
import { Selection as Selection_2 } from 'd3-selection';

export declare interface Command {
    record: boolean;
    undo: () => void;
    exec: () => void;
}

export declare class CommandAddRect implements Command {
    parent: Rect;
    rect: Rect;
    record: boolean;
    constructor(parent: Rect, rect: Rect);
    undo(): void;
    exec(): void;
}

export declare class CommandMoveRect implements Command {
    private selectedRect;
    private value;
    private snapshot;
    record: boolean;
    constructor(selectedRect: Rect, value: Coord, snapshot: Coord);
    undo(): void;
    exec(): void;
}

export declare class CommandRemoveRect implements Command {
    parent: Rect;
    rect: Rect;
    record: boolean;
    constructor(parent: Rect, rect: Rect);
    undo(): void;
    exec(): void;
}

export declare class CompositeCommand implements Command {
    private readonly commands;
    record: boolean;
    constructor(commands: Command[]);
    exec(): void;
    undo(): void;
}

declare interface Coord {
    x: number;
    y: number;
}

declare type DomSelection = Selection_2<any, any, any, any>;

export declare class Hook {
    private storage;
    add(name: HookNames, func: HookCallback): void;
    execute(name: HookNames, ...args: any[]): void;
}

export declare const hook: unique symbol;

declare function hook_on_drag_leave(this: Store, func: HookCallback<[DragEvent]>): void;

declare function hook_on_drag_over(this: Store, func: HookCallback<[DragEvent]>): void;

declare function hook_on_drop(this: Store, func: HookCallback<[DragEvent]>): void;

declare function hook_on_mount_end(this: Store, func: HookCallback): void;

declare function hook_on_mount_start(this: Store, func: HookCallback): void;

declare function hook_on_move_rect(this: Store, func: HookCallback<[
    {
    x: number;
    y: number;
    dx: number;
    dy: number;
}
]>): void;

declare function hook_on_move_rect_end(this: Store, func: HookCallback<[number, number]>): void;

declare function hook_on_move_rect_start(this: Store, func: HookCallback<[number, number]>): void;

declare function hook_on_selected(this: Store, func: HookCallback<[number, number]>): void;

declare function hook_on_transform(this: Store, func: HookCallback): void;

export declare type HookCallback<T extends any[] = any[]> = (...args: T) => void;

export declare enum HookNames {
    onTransform = "onTransform",
    onMountStart = "onMountStart",
    onMountEnd = "onMountEnd",
    onMoveRect = "onMoveRect",
    onMoveRectEnd = "onMoveRectEnd",
    onMoveRectStart = "onMoveRectStart",
    onSelected = "onSelected",
    onDrop = "onDrop",
    onDragLeave = "onDragLeave",
    onDragOver = "onDragOver"
}

export declare class Manager {
    private undoStack;
    private redoStack;
    private maximum;
    execute(command: Command): void;
    undo(): void;
    redo(): void;
}

export declare class Observer {
    root: Element;
    board: Element;
    rootDOMRect: DOMRect;
    boardDOMRect: DOMRect;
    update(): void;
    get boardCoord(): {
        x: number;
        y: number;
    };
    constructor(root: Element, board: Element);
}

export declare type PluginCreator<T> = (store: Store) => PluginOptions<T>;

export declare type PluginOptions<T> = {
    name: string;
    data: T;
    install: (options?: any) => void;
    uninstall: () => void;
};

export declare class Plugins {
    private storage;
    add(name: string, plugin: PluginOptions<any>): void;
    getAll(): Map<string, PluginOptions<any>>;
    get<T>(name: string): PluginOptions<T>;
}

export declare const plugins: unique symbol;

export declare class Rect {
    #private;
    node: DomSelection_2;
    parent: Rect | null;
    children: Rect[];
    constructor({ x, y, h, w, node }: RectConstructor);
    get id(): string;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get w(): number;
    set w(value: number);
    get h(): number;
    set h(value: number);
    set error(value: boolean);
    get error(): boolean;
    isInside: typeof rect_is_inside;
    isIntersect: typeof rect_is_intersect;
    align: typeof rect_align;
    remove: typeof rect_remove;
    addChild: typeof rect_add_child;
    find: typeof rect_find;
    clone: typeof rect_clone;
    static from: typeof rect_from;
    static traverse: typeof rect_traverse;
    static isMovable: typeof rect_is_movable;
    static isContainer: typeof rect_is_container;
    static isBoard: typeof rect_is_board;
    static isAssist: typeof rect_is_assist;
    static isRoot: typeof rect_is_root;
}

declare function rect_add_child(this: Rect, rect: Rect): void;

declare function rect_align(this: Rect, type: "h-start" | "h-center" | "h-end" | "v-top" | "v-center" | "v-bottom"): void;

declare function rect_clone(this: Rect): Rect;

declare function rect_find(this: Rect, predicate: (item: Rect) => boolean, algorithm?: "bfs" | "dfs"): Rect | null;

declare function rect_from(node: HTMLElement): Rect;

declare function rect_is_assist(node: DomSelection): boolean;

declare function rect_is_board(node: DomSelection): boolean;

declare function rect_is_container(node: DomSelection): boolean;

declare function rect_is_inside(this: Rect, coord: Coord): boolean;

declare function rect_is_intersect(this: Rect, rect: Pick<Rect, "x" | "y" | "w" | "h">): boolean;

declare function rect_is_movable(node: DomSelection): boolean;

declare function rect_is_root(node: DomSelection): boolean;

declare function rect_remove(this: Rect): void;

declare function rect_traverse(rect: Rect, callback: (item: Rect, depth: number) => void, algorithm?: "bfs" | "dfs", depth?: number): void;

declare interface RectConstructor {
    x: number;
    y: number;
    h: number;
    w: number;
    node: HTMLElement;
}

export declare enum RectType {
    Movable = "movable",
    Container = "container",
    Board = "board",
    Assist = "assist",
    Root = "root"
}

export declare class Store {
    #private;
    root: DomSelection;
    board: DomSelection;
    assist: DomSelection;
    transform: Transform;
    observer: Observer;
    rect: Rect;
    manager: Manager;
    get selectedRect(): Rect;
    set selectedRect(rect: Rect);
    [hook]: Hook;
    [plugins]: Plugins;
    searchError: typeof store_search_error;
    applyTransform: typeof store_apply_transform;
    plugin: typeof store_plugin;
    pluginData: typeof store_plugin_data;
    mount: typeof store_mount;
    onTransform: typeof hook_on_transform;
    onMountStart: typeof hook_on_mount_start;
    onMountEnd: typeof hook_on_mount_end;
    onMoveRect: typeof hook_on_move_rect;
    onMoveRectEnd: typeof hook_on_move_rect_end;
    onMoveRectStart: typeof hook_on_move_rect_start;
    onSelected: typeof hook_on_selected;
    onDrop: typeof hook_on_drop;
    onDragOver: typeof hook_on_drag_over;
    onDragLeave: typeof hook_on_drag_leave;
    constructor(root: HTMLElement, board: HTMLElement);
}

declare function store_apply_transform(this: Store): void;

declare function store_mount(this: Store): void;

declare function store_plugin(this: Store, plugin: PluginCreator<any>, options?: any): Store;

declare function store_plugin_data<T>(this: Store, name: string): T;

declare function store_search_error(this: Store): void;

export declare class Transform {
    scale: number;
    translateX: number;
    translateY: number;
    scaleExtent: [number, number];
    constructor(scale: number, translateX: number, translateY: number);
    toString(): string;
}

export { }
