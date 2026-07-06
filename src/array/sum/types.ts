export {};

declare global {
  interface Array<T> {
    sum(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    sum(this: readonly T[], fn: (val: T) => number): number;
  }
}
