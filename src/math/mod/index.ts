export const mod = (x: number, y: number) =>
  y === 0 ? x : x - Math.floor(x / y) * y;
