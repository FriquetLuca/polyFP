export const betweenInclusive = (value: number, a: number, b: number) =>
  value >= Math.min(a, b) && value <= Math.max(a, b);
