export function simpleMovingAverage<T>(
  array: T[],
  fn: (val: T) => number,
  windowSize: number
): number[] {
  if (windowSize <= 0) throw new Error('windowSize must be > 0');
  if (array.length === 0) return [];

  const result: number[] = [];
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += fn(array[i]);

    if (i >= windowSize) {
      sum -= fn(array[i - windowSize]);
    }

    if (i >= windowSize - 1) {
      result.push(sum / windowSize);
    }
  }

  return result;
}
