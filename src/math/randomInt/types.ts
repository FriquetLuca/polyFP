export {};

declare global {
  interface Math {
    randomInt(min: number, max: number): number;
  }
}
