export {};

declare global {
  interface Array<T> {
    weightedMovingAverage: T extends number
      ? (this: T[], weights: number[], windowSize: number) => number[]
      : never;
  }
  interface ReadonlyArray<T> {
    weightedMovingAverage: T extends number
      ? (this: readonly T[], weights: number[], windowSize: number) => number[]
      : never;
  }
}
