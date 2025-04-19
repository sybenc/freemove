export function toPx(value: any): string {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}

export function epsilonEqual(a: number, b: number, epsilon: number = 0.1): boolean {
  return Math.abs(a - b) <= epsilon;
}

export function getElement<T>(g: Element, className: string): T {
  return g.getElementsByClassName(className)[0] as T;
}

export function createElementNS<T>(tag: string): T {
  return document.createElementNS("http://www.w3.org/2000/svg", tag) as T;
}

export function showNumber(value: number, round: boolean = false) {
  if (round) return Math.round(parseFloat(value.toFixed(1)));
  if (Number.isInteger(value)) return value.toFixed(0);
  else return value.toFixed(1);
}
