export {};

declare global {
  interface Array<T> {
    groupBy<K extends string | number | symbol>(
      this: T[],
      fn: (x: T) => K
    ): Record<K, T[]>;
  }
  interface ReadonlyArray<T> {
    groupBy<K extends string | number | symbol>(
      this: readonly T[],
      fn: (x: T) => K
    ): Record<K, T[]>;
  }
}
