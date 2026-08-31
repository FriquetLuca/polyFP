export function range<T>(values: T[], mapper: (item: T) => number): number {
  if (values.length === 0) {
    throw new Error('range: cannot compute the range of an empty dataset');
  }
  let current = mapper(values[0]);
  let min = current;
  let max = current;
  for (const v of values) {
    current = mapper(v);
    if (current < min) min = current;
    if (current > max) max = current;
  }
  return max - min;
}
