export function ruler_line_add(actual) {
    this.lines.add(Math.round(this.scaleLinear.invert(actual)));
    this.lineRender();
}
