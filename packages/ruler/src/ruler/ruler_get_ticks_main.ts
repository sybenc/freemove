import { _Ruler } from "./ruler";

export function ruler_get_ticks_main(this: _Ruler) {
  return this.svg
    .selectAll("text")
    .nodes()
    .map((item) => {
      if (!item) return 0;
      const str = (item as any).textContent.replace(/,/g, "").replace(/−/g, "-");
      return Number(str) || 0;
    });
}
