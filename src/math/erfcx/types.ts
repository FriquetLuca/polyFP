export {};

declare global {
  interface Math {
    erfcx(x: number): number;
  }
}
