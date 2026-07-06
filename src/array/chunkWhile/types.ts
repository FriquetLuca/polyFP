export {};

declare global {
  interface Array<T> {
    chunkWhile(
      this: T[],
      predicate: (previous: T, current: T) => boolean
    ): T[][];
  }
  interface ReadonlyArray<T> {
    chunkWhile(
      this: readonly T[],
      predicate: (previous: T, current: T) => boolean
    ): T[][];
  }
}
