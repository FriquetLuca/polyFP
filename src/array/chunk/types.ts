export {};

declare global {
  interface Array<T> {
    chunk(this: T[], size: number): T[][];
  }
  interface ReadonlyArray<T> {
    chunk(this: readonly T[], size: number): T[][];
  }
}
