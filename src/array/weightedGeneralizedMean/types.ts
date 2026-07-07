export {};

declare global {
  interface Array<T> {
    weightedGeneralizedMean: T extends number
      ? (this: T[], weights: number[], p: number) => number
      : never;
  }
  interface ReadonlyArray<T> {
    weightedGeneralizedMean: T extends number
      ? (this: readonly T[], weights: number[], p: number) => number
      : never;
  }
}
