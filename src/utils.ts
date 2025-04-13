export function toPx(value: any): string {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}

/**
 * 判断两个数在允许误差内是否相等
 * @param a 第一个数
 * @param b 第二个数
 * @param epsilon 允许误差（默认 0.1）
 * @returns 布尔值，表示是否相等
 */
export function epsilonEqual(a: number, b: number, epsilon: number = 0.1): boolean {
  return Math.abs(a - b) <= epsilon;
}