export {};

declare global {
  interface Array<T> {
    avg(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    avg(this: readonly T[], fn: (val: T) => number): number;
  }
}
