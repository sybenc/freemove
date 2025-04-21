import { ClassPrefix } from "../const";
import { Store } from "../store";
import { toPx } from "../utils";

export class Ruler {
  canvas: HTMLCanvasElement;

  constructor(border: HTMLElement) {
    this.canvas = document.createElement("canvas");
    border.append(this.canvas);
  }

  reRender(store: Store) {
    const boardRect = store.board.getBoundingClientRect();
    this.canvas.setAttribute("width", toPx(boardRect.width));
    this.canvas.setAttribute("height", toPx(boardRect.height));
    this.canvas.setAttribute("class", `${ClassPrefix}-ruler-canvas`);
    this.canvas.setAttribute("inset", "0");
    this.canvas.style.position = "absolute";
    const { translateX, translateY, scale } = store;
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, boardRect.width, boardRect.height);

    // 保存当前状态并应用缩放和平移
    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.scale(scale, scale);

    // 绘制网格
    const step = 25; // 网格间隔
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1 / scale;

     // 获取当前视口范围
     const viewportWidth = boardRect.width / scale;
     const viewportHeight = boardRect.height / scale;
  }
}
