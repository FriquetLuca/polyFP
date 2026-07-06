export function chunkWhile<T>(
  array: T[],
  predicate: (previous: T, current: T) => boolean
): T[][] {
  if (array.length === 0) return [];

  const result: T[][] = [];
  let chunk: T[] = [array[0]];

  for (let i = 1; i < array.length; i++) {
    const previous = array[i - 1];
    const current = array[i];

    if (predicate(previous, current)) {
      chunk.push(current);
    } else {
      result.push(chunk);
      chunk = [current];
    }
  }

  result.push(chunk);
  return result;
}
