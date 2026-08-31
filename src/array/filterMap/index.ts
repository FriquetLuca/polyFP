export function filterMap<T, U>(
  arr: T[],
  mapper: (value: T, index: number, array: T[]) => U | undefined | null
): U[] {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = mapper(arr[i], i, arr);
    if (item != null) {
      result.push(item);
    }
  }
  return result;
}
