export {};

declare global {
  interface Math {
    betweenInclusive(value: number, a: number, b: number): boolean;
  }
}
