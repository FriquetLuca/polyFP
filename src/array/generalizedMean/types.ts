export {};

declare global {
  interface Array<T> {
    generalizedMean(this: T[], fn: (val: T) => number, p: number): number;
  }
  interface ReadonlyArray<T> {
    generalizedMean(
      this: readonly T[],
      fn: (val: T) => number,
      p: number
    ): number;
  }
}
