export {};

declare global {
  interface Math {
    approximately(a: number, b: number, delta?: number): boolean;
  }
}
