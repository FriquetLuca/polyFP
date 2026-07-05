export {};

declare global {
  interface Array<T> {
    intersection(this: T[], b: T[]): T[];
  }
  interface ReadonlyArray<T> {
    intersection(this: readonly T[], b: T[]): T[];
  }
}
