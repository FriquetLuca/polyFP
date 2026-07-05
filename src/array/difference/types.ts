export {};

declare global {
  interface Array<T> {
    difference(this: T[], b: T[]): T[];
  }
  interface ReadonlyArray<T> {
    difference(this: readonly T[], b: T[]): T[];
  }
}
