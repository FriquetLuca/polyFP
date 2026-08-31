export {};

declare global {
  interface Array<T> {
    quantile: T extends number ? (this: number[], q: number) => number : never;
  }
  interface ReadonlyArray<T> {
    quantile: T extends number
      ? (this: readonly number[], q: number) => number
      : never;
  }
}
