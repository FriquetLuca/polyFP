export {};

declare global {
  interface Array<T> {
    swap(this: T[], a: number, b: number): T[];
  }
  interface ReadonlyArray<T> {
    swap(this: readonly T[], a: number, b: number): T[];
  }
}
