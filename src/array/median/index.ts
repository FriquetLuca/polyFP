export function median<T>(values: T[], fn: (val: T) => number): number {
  if (values.length === 0) return 0;
  const sorted = values.map(fn).sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  if ((sorted.length & 1) === 0) return (sorted[mid - 1] + sorted[mid]) / 2;
  return sorted[mid];
}
