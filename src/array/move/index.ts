export function move<T>(array: T[], from: number, to: number): T[] {
  if (from === to) return array;

  const length = array.length;

  if (from < 0 || from >= length || to < 0 || to >= length) {
    throw new RangeError('Index out of bounds');
  }
  const result = array.slice();
  const value = result[from];

  if (from < to) {
    for (let i = from; i < to; i++) {
      result[i] = result[i + 1];
    }
  } else {
    for (let i = from; i > to; i--) {
      result[i] = result[i - 1];
    }
  }

  result[to] = value;
  return result;
}
