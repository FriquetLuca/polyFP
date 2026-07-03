export {};

declare global {
  interface Array<T> {
    intersection(this: T[], b: readonly T[]): T[];
  }
  interface ReadonlyArray<T> {
    intersection(this: T[], b: readonly T[]): T[];
  }
}
