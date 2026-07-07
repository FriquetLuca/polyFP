import { median } from '../median';

export function medianAbsoluteDeviation<T>(
  values: T[],
  fn: (val: T) => number
): number {
  if (values.length === 0) return 0;
  const med = median(values, fn);
  const deviations = new Array<number>(values.length);
  for (let i = 0; i < values.length; i++) {
    deviations[i] = Math.abs(fn(values[i]) - med);
  }
  return median(deviations, (v) => v);
}
