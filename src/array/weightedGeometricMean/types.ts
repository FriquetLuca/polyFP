export {};

declare global {
  interface Array<T> {
    weightedGeometricMean: T extends number
      ? (this: T[], weights: number[]) => number
      : never;
  }
  interface ReadonlyArray<T> {
    weightedGeometricMean: T extends number
      ? (this: readonly T[], weights: number[]) => number
      : never;
  }
}
