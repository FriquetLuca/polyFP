export {};

declare global {
  interface Array<T> {
    weightedHarmonicMean: T extends number
      ? (this: T[], weights: number[]) => number
      : never;
  }
  interface ReadonlyArray<T> {
    weightedHarmonicMean: T extends number
      ? (this: readonly T[], weights: number[]) => number
      : never;
  }
}
