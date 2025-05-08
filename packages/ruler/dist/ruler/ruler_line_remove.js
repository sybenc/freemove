export function ruler_line_remove(logic) {
    this.lines.delete(logic);
    this.lineRender();
}
