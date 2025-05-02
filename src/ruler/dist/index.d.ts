import { Observer } from "./observe";
import { _Ruler } from "./ruler/ruler";
export default class Ruler {
    x: _Ruler;
    y: _Ruler;
    constructor(observer: Observer<HTMLElement | SVGElement>);
}
