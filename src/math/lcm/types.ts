export {};

declare global {
  interface Math {
    lcm(a: number, b: number): number;
  }
}
