import { median } from '../median';

export function avgAbsDevAroundMedian<T>(
  values: T[],
  fn: (val: T) => number
): number {
  if (values.length === 0) return 0;
  const med = median(values, fn);
  return values.reduce((p, c) => p + Math.abs(fn(c) - med), 0) / values.length;
}
