export const between = (value: number, a: number, b: number) =>
  value > Math.min(a, b) && value < Math.max(a, b);
