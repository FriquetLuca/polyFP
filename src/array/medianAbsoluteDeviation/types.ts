export {};

declare global {
  interface Array<T> {
    medianAbsoluteDeviation(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    medianAbsoluteDeviation(this: readonly T[], fn: (val: T) => number): number;
  }
}
