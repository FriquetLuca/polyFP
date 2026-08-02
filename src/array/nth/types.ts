export {};

declare global {
  interface Array<T> {
    nth(this: T[], pos: number): T | undefined;
  }
  interface ReadonlyArray<T> {
    nth(this: readonly T[], pos: number): T | undefined;
  }
}
