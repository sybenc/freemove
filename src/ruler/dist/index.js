import { _Ruler } from "./ruler/ruler";
export default class Ruler {
    x;
    y;
    constructor(observer) {
        this.x = new _Ruler("x", observer);
        this.y = new _Ruler("y", observer);
        this.y.mount();
        this.x.mount();
        this.x.applyTransform(1, 0, 0);
        this.y.applyTransform(1, 0, 0);
    }
}
