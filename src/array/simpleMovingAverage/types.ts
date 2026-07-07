export {};

declare global {
  interface Array<T> {
    simpleMovingAverage(
      this: T[],
      fn: (val: T) => number,
      windowSize: number
    ): number[];
  }
  interface ReadonlyArray<T> {
    simpleMovingAverage(
      this: readonly T[],
      fn: (val: T) => number,
      windowSize: number
    ): number[];
  }
}
