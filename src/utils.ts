export function toPx(value: any): string {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}

export function epsilonEqual(a: number, b: number, epsilon: number = 0.1): boolean {
  return Math.abs(a - b) <= epsilon;
}

export function getElement(g: Element, className: string): HTMLElement{
  return g.getElementsByClassName(className)[0] as HTMLElement;
}