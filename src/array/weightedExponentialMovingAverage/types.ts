export {};

declare global {
  interface Array<T> {
    weightedExponentialMovingAverage(
      this: T[],
      fn: (val: T) => number,
      alpha: number
    ): number[];
  }
  interface ReadonlyArray<T> {
    weightedExponentialMovingAverage(
      this: readonly T[],
      fn: (val: T) => number,
      alpha: number
    ): number[];
  }
}
