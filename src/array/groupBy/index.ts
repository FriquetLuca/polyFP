export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  fn: (x: T) => K
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of arr) {
    const key = fn(item);
    result[key] ??= [];
    result[key].push(item);
  }
  return result;
}
