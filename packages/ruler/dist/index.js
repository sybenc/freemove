import { _Ruler } from "./ruler/ruler";
export class Ruler {
    x;
    y;
    constructor(observer) {
        this.x = new _Ruler("x", observer);
        this.y = new _Ruler("y", observer);
        this.y.mount();
        this.x.mount();
        this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
        this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
    }
}
export const ruler = (store) => {
    const ruler = new Ruler(store.observer);
    return {
        name: "ruler",
        data: ruler,
        install() {
            store.onTransform(() => {
                ruler.x.applyTransform(store.transform);
                ruler.y.applyTransform(store.transform);
                ruler.x.meshUnmount();
                ruler.y.meshUnmount();
            });
            store.onMountStart(() => {
                ruler.x.sliderRender(store.selectedRect);
                ruler.y.sliderRender(store.selectedRect);
            });
            store.onMoveRect(() => {
                ruler.x.sliderRender(store.selectedRect);
                ruler.y.sliderRender(store.selectedRect);
            });
            store.onMountEnd(() => {
                ruler.x.sliderHidden();
                ruler.y.sliderHidden();
            });
        },
        uninstall() {
            ruler.x.unmount();
            ruler.y.unmount();
            ruler.x.meshUnmount();
            ruler.y.meshUnmount();
            ruler.x.sliderHidden();
            ruler.y.sliderHidden();
        },
    };
};
