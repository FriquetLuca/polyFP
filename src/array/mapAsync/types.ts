export {};

declare global {
  interface Array<T> {
    mapAsync<R>(
      this: T[],
      fn: (item: T, index: number) => Promise<R>,
      concurrency?: number
    ): Promise<R[]>;
  }
  interface ReadonlyArray<T> {
    mapAsync<R>(
      this: readonly T[],
      fn: (item: T, index: number) => Promise<R>,
      concurrency?: number
    ): Promise<R[]>;
  }
}
