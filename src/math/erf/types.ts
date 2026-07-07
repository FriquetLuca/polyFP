export {};

declare global {
  interface Math {
    erf(x: number): number;
  }
}
