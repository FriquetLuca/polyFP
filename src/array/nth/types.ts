export {};

declare global {
  interface Array<T> {
    nth<T>(this: T[], pos: number): T | undefined;
  }
  interface ReadonlyArray<T> {
    nth<T>(this: readonly T[], pos: number): T | undefined;
  }
}
