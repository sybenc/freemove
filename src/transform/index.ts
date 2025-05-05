export class Transform {
  scale: number;
  translateX: number;
  translateY: number;
  scaleExtent: [number, number] = [0.4, 50];

  constructor(scale: number, translateX: number, translateY: number) {
    this.scale = scale;
    this.translateX = translateX;
    this.translateY = translateY;
  }

  toString() {
    return `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }
}
