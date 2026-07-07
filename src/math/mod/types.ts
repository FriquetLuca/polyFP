export {};

declare global {
  interface Math {
    mod(x: number, y: number): number;
  }
}
