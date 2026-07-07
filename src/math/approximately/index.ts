export const approximately = (a: number, b: number, delta = 0.000001) =>
  Math.abs(b - a) <= delta;
