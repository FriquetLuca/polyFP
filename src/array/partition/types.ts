export {};

declare global {
  interface Array<T> {
    partition(this: T[], pred: (x: T) => boolean): [T[], T[]];
  }
  interface ReadonlyArray<T> {
    partition(this: readonly T[], pred: (x: T) => boolean): [T[], T[]];
  }
}
