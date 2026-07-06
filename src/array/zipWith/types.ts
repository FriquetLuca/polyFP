export {};

declare global {
  interface Array<T> {
    zipWith<B, R>(this: T[], b: B[], fn: (a: T, b: B, index: number) => R): R[];
  }
  interface ReadonlyArray<T> {
    zipWith<B, R>(
      this: readonly T[],
      b: B[],
      fn: (a: T, b: B, index: number) => R
    ): R[];
  }
}
