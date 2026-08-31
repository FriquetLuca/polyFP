export {};

declare global {
  interface Array<T> {
    reduceAsync<Acc>(
      this: T[],
      fn: (acc: Acc, item: T, index: number) => Promise<Acc>,
      initial: Acc
    ): Promise<Acc>;
  }
  interface ReadonlyArray<T> {
    reduceAsync<Acc>(
      this: readonly T[],
      fn: (acc: Acc, item: T, index: number) => Promise<Acc>,
      initial: Acc
    ): Promise<Acc>;
  }
}
