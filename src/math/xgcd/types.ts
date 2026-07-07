export {};

declare global {
  interface Math {
    xgcd(
      a: number,
      b: number
    ): {
      gcd: number;
      x: number;
      y: number;
    };
  }
}
