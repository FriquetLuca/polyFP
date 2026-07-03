export {};

declare global {
  interface Array<T> {
    difference(this: T[], b: readonly T[]): T[];
  }
  interface ReadonlyArray<T> {
    difference(this: T[], b: readonly T[]): T[];
  }
}
