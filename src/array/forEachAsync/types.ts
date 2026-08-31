export {};

declare global {
  interface Array<T> {
    forEachAsync(
      this: T[],
      fn: (item: T, index: number) => Promise<void>,
      concurrency?: number
    ): Promise<void>;
  }
  interface ReadonlyArray<T> {
    forEachAsync(
      this: readonly T[],
      fn: (item: T, index: number) => Promise<void>,
      concurrency?: number
    ): Promise<void>;
  }
}
