export {};

declare global {
  interface Array<T> {
    cumulativeAverage(this: T[], fn: (val: T) => number): number[];
  }
  interface ReadonlyArray<T> {
    cumulativeAverage(this: readonly T[], fn: (val: T) => number): number[];
  }
}
