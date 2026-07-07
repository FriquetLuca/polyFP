export {};

declare global {
  interface Math {
    saturate(a: number): number;
  }
}
