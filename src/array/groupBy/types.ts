export {};

declare global {
  interface ArrayConstructor {
    groupBy<T, K extends string | number | symbol>(
      fn: (x: T) => K
    ): (arr: readonly T[]) => Record<K, T[]>;
  }
}
