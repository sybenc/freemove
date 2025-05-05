import Rect from "./rect";

export function rect_align(this: Rect, type: "h-start" | "h-center" | "h-end" | "v-top" | "v-center" | "v-bottom") {
  if (!this.parent) return;
  const parent = this.parent;
  switch (type) {
    case "h-start":
      this.x = 0;
      break;
    case "h-center":
      this.x = parent.w / 2 - this.w / 2;
      break;
    case "h-end":
      this.x = parent.w - this.w;
      break;
    case "v-top":
      this.y = 0;
      break;
    case "v-center":
      this.y = parent.h / 2 - this.h / 2;
      break;
    case "v-bottom":
      this.x = parent.h - this.h;
      break;
    default:
      break;
  }
}
