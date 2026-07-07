export function cumulativeAverage<T>(
  array: T[],
  fn: (val: T) => number
): number[] {
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += fn(array[i]);
    result.push(sum / (i + 1));
  }
  return result;
}
