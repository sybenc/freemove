import { _Ruler } from "./ruler";
export interface Transform {
    scale: number;
    translateX: number;
    translateY: number;
}
export declare function ruler_apply_transform(this: _Ruler, { scale, translateX, translateY }: Transform): void;
