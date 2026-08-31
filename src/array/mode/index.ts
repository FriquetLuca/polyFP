export function mode<T>(values: T[]): T[] {
  if (values.length === 0) return [];

  const counts = new Map<T, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  let maxCount = 0;
  for (const count of counts.values()) {
    if (count > maxCount) maxCount = count;
  }

  const result: T[] = [];
  for (const [value, count] of counts) {
    if (count === maxCount) result.push(value);
  }

  return result;
}
