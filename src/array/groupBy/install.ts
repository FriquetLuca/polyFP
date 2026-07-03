export * from './types';

export function installGroupBy() {
  if (!Array.prototype.groupBy) {
    Object.defineProperty(Array.prototype, 'groupBy', {
      value<T, K extends string | number | symbol>(
        this: T[],
        fn: (x: T) => K
      ): Record<K, T[]> {
        const result = {} as Record<K, T[]>;
        for (const item of this) {
          const key = fn(item);
          result[key] ??= [];
          result[key].push(item);
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
