export const groupBy =
  <T, K extends string | number | symbol>(fn: (x: T) => K) =>
  (arr: readonly T[]): Record<K, T[]> => {
    const result = {} as Record<K, T[]>;

    for (const item of arr) {
      const key = fn(item);
      result[key] ??= [];
      result[key].push(item);
    }

    return result;
  };
