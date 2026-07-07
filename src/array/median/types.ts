export {};

declare global {
  interface Array<T> {
    median(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    median(this: readonly T[], fn: (val: T) => number): number;
  }
}
