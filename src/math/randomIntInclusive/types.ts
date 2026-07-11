export {};

declare global {
  interface Math {
    randomIntInclusive(min: number, max: number): number;
  }
}
