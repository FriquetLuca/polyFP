export {};

declare global {
  interface Math {
    invmod(a: number, b: number): number;
  }
}
