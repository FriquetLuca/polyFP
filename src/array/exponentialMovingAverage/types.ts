export {};

declare global {
  interface Array<T> {
    exponentialMovingAverage(
      this: T[],
      fn: (val: T) => number,
      alpha: number
    ): number[];
  }
  interface ReadonlyArray<T> {
    exponentialMovingAverage(
      this: readonly T[],
      fn: (val: T) => number,
      alpha: number
    ): number[];
  }
}
