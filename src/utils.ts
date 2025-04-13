export function toPx(value: any): string {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}