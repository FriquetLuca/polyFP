export {};

declare global {
  interface Array<T> {
    filterAsync(
      this: T[],
      predicate: (item: T, index: number) => Promise<boolean>,
      concurrency?: number
    ): Promise<T[]>;
  }
  interface ReadonlyArray<T> {
    filterAsync(
      this: readonly T[],
      predicate: (item: T, index: number) => Promise<boolean>,
      concurrency?: number
    ): Promise<T[]>;
  }
}
