export {};

declare global {
  interface Math {
    erfc(x: number): number;
  }
}
