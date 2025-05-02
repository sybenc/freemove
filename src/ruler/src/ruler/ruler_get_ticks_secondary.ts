import { _Ruler } from "./ruler";

export function ruler_get_ticks_secondary(this: _Ruler) {
  const mainTicks = this.getMainTicks();
  const mainTickScale = this.svg
    .selectAll(".tick")
    .nodes()
    .map((item) => {
      // @ts-ignore
      const transform = item.getAttribute("transform"); // 获取 transform 字符串
      const match = this.__isX ? transform.match(/translate\(([^,]+),/) : transform.match(/translate\(0,([^,]+)/);
      return parseFloat(match[1]) || 0;
    });

  const handleComputeSecondaryTicks = (count: number) => {
    const result: number[] = [];
    let start = mainTickScale[0];
    let end = mainTickScale[mainTickScale.length - 1];
    const gap = Math.abs(end - start) / (count * (mainTickScale.length - 1));
    while (start - gap > 0) start -= gap;
    while (end + gap < this.width) end += gap;
    // console.log(end,start,count * mainTickScale.length)
    for (let i = start; i <= end; i += gap) result.push(i);
    return result;
  };

  const mainTickGap = Math.abs(mainTicks[0] - mainTicks[1]);
  if (mainTickGap >= 10) return handleComputeSecondaryTicks(10);
  else if (mainTickGap === 5) return handleComputeSecondaryTicks(5);
  else if (mainTickGap > 1 && mainTickGap < 5) return handleComputeSecondaryTicks(2);
  else return handleComputeSecondaryTicks(1);
}
