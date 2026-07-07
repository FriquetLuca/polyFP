export function exponentialMovingAverage<T>(
  array: T[],
  fn: (val: T) => number,
  alpha: number
): number[] {
  if (alpha <= 0 || alpha > 1) throw new Error('alpha must be in (0, 1]');
  if (array.length === 0) return [];
  const result: number[] = [];
  let ema = fn(array[0]);
  result.push(ema);
  for (let i = 1; i < array.length; i++) {
    ema = alpha * fn(array[i]) + (1 - alpha) * ema;
    result.push(ema);
  }
  return result;
}
