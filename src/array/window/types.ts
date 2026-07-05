export {};

declare global {
  interface Array<T> {
    window(this: T[], size: number): T[][];
  }
  interface ReadonlyArray<T> {
    window(this: readonly T[], size: number): T[][];
  }
}
