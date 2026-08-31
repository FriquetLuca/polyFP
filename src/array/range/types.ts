export {};

declare global {
  interface Array<T> {
    range(this: T[], mapper: (item: T) => number): number;
  }
  interface ReadonlyArray<T> {
    range(this: readonly T[], mapper: (item: T) => number): number;
  }
}
