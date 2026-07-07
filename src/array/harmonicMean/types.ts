export {};

declare global {
  interface Array<T> {
    harmonicMean(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    harmonicMean(this: readonly T[], fn: (val: T) => number): number;
  }
}
