export {};

declare global {
  interface Array<T> {
    avgAbsDevAroundMedian(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    avgAbsDevAroundMedian(this: readonly T[], fn: (val: T) => number): number;
  }
}
