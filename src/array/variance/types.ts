export {};

declare global {
  interface Array<T> {
    variance(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    variance(this: readonly T[], fn: (val: T) => number): number;
  }
}
