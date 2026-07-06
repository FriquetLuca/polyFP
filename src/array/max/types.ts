export {};

declare global {
  interface Array<T> {
    max(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    max(this: readonly T[], fn: (val: T) => number): number;
  }
}
