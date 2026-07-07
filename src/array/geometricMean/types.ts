export {};

declare global {
  interface Array<T> {
    geometricMean(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    geometricMean(this: readonly T[], fn: (val: T) => number): number;
  }
}
