export {};

declare global {
  interface Math {
    between(value: number, a: number, b: number): boolean;
  }
}
