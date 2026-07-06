export * from './types';

export function installCountBy() {
  if (!Array.prototype.countBy) {
    Object.defineProperty(Array.prototype, 'countBy', {
      value<T, K extends PropertyKey>(
        array: T[],
        selector: (item: T) => K
      ): Record<K, number> {
        const result = {} as Record<K, number>;
        for (const item of array) {
          const key = selector(item);
          result[key] ??= 0;
          result[key] += 1;
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
