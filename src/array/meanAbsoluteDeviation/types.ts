export {};

declare global {
  interface Array<T> {
    meanAbsoluteDeviation(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    meanAbsoluteDeviation(this: readonly T[], fn: (val: T) => number): number;
  }
}
