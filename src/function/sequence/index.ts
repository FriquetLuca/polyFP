export const sequence = async <T>(
  promises: Iterable<Promise<T>>
): Promise<T[]> => Promise.all(promises);
