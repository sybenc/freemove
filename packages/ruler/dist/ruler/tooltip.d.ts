export declare class Tooltip {
    container: import("d3-selection").Selection<HTMLDivElement, undefined, null, undefined>;
    mount(): this;
    unmount(): void;
    show(): this;
    hidden(): this;
    html(html: string): this;
    fixed(x: number, y: number): this;
}
