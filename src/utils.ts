export function toPx(value: any): string {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}

export function epsilonEqual(a: number, b: number, epsilon: number = 0.1): boolean {
  return Math.abs(a - b) <= epsilon;
}
