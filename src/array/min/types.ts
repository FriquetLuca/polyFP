export {};

declare global {
  interface Array<T> {
    min(this: T[], fn: (val: T) => number): number;
  }
  interface ReadonlyArray<T> {
    min(this: readonly T[], fn: (val: T) => number): number;
  }
}
