export {};

declare global {
  interface Array<T> {
    mode(this: T[]): T[];
  }
  interface ReadonlyArray<T> {
    mode(this: readonly T[]): T[];
  }
}
