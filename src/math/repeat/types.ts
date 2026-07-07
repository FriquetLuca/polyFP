export {};

declare global {
  interface Math {
    repeat(t: number, a: number): number;
  }
}
