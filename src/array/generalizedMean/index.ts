export function generalizedMean<T>(
  array: T[],
  fn: (val: T) => number,
  p: number
): number {
  if (array.length === 0) return 0;

  if (p === Number.POSITIVE_INFINITY) {
    let max = fn(array[0]);
    for (let i = 1; i < array.length; i++) {
      const c = fn(array[i]);
      if (c > max) max = c;
    }
    return max;
  }
  if (p === Number.NEGATIVE_INFINITY) {
    let min = fn(array[0]);
    for (let i = 1; i < array.length; i++) {
      const c = fn(array[i]);
      if (c < min) min = c;
    }
    return min;
  }
  if (p === 0) {
    let logSum = 0;
    for (let i = 0; i < array.length; i++) {
      const x = fn(array[i]);
      if (x <= 0) {
        throw new Error('Geometric mean requires positive numbers');
      }
      logSum += Math.log(x);
    }
    return Math.exp(logSum / array.length);
  }
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += Math.pow(fn(array[i]), p);
  }
  return Math.pow(sum / array.length, 1 / p);
}
