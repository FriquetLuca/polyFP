export {};

declare global {
  interface Math {
    gcd(a: number, b: number): number;
  }
}
