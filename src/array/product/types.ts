export {};

declare global {
  interface Array<T> {
    product(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    product(this: readonly T[], fn: (val: T) => number): number;
  }
}
