export {};

declare global {
  interface Array<T> {
    medianAbsoluteDeviationNormalized(
      this: T[],
      fn: (val: T) => number
    ): number;
  }
  interface ReadonlyArray<T> {
    medianAbsoluteDeviationNormalized(
      this: readonly T[],
      fn: (val: T) => number
    ): number;
  }
}
