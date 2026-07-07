export {};

declare global {
  interface Array<T> {
    weightedRootMeanSquare: T extends number
      ? (this: T[], weights: number[]) => number
      : never;
  }
  interface ReadonlyArray<T> {
    weightedRootMeanSquare: T extends number
      ? (this: readonly T[], weights: number[]) => number
      : never;
  }
}
