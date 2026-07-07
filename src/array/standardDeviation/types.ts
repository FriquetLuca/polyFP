export {};

declare global {
  interface Array<T> {
    standardDeviation(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    standardDeviation(this: readonly T[], fn: (val: T) => number): number;
  }
}
