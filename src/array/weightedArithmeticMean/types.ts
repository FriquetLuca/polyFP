export {};

declare global {
  interface Array<T> {
    weightedArithmeticMean: T extends number
      ? (this: T[], weights: number[]) => number
      : never;
  }
  interface ReadonlyArray<T> {
    weightedArithmeticMean: T extends number
      ? (this: readonly T[], weights: number[]) => number
      : never;
  }
}
