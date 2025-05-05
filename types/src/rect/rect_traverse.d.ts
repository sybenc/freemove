import Rect from "./rect";
export declare function rect_traverse(rect: Rect, callback: (item: Rect, depth: number) => void, algorithm?: "bfs" | "dfs", depth?: number): void;
