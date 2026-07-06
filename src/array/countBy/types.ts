export {};

declare global {
  interface Array<T> {
    countBy<K extends PropertyKey>(
      this: T[],
      selector: (item: T) => K
    ): Record<K, number>;
  }
  interface ReadonlyArray<T> {
    countBy<K extends PropertyKey>(
      this: readonly T[],
      selector: (item: T) => K
    ): Record<K, number>;
  }
}
