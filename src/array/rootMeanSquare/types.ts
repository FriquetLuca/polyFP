export {};

declare global {
  interface Array<T> {
    rootMeanSquare(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    rootMeanSquare(this: readonly T[], fn: (val: T) => number): number;
  }
}
