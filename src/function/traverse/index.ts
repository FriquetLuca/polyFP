export const traverse = async <T, U>(
  items: Iterable<T>,
  fn: (item: T) => Promise<U>
): Promise<U[]> => Promise.all(Array.from(items, fn));
