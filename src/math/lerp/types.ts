export {};

declare global {
  interface Math {
    lerp(a: number, b: number, t: number): number;
  }
}
