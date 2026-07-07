export function swap<T>(array: T[], a: number, b: number): T[] {
  if (a === b) return array;

  if (a < 0 || a >= array.length || b < 0 || b >= array.length) {
    throw new RangeError('Index out of bounds');
  }
  const result = array.slice();
  [result[a], result[b]] = [result[b], result[a]];
  return result;
}
