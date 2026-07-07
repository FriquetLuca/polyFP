export {};

declare global {
  interface Math {
    pascalTriangle(value: number, iterations: number): number;
  }
}
