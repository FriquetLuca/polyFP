export {};

declare global {
  interface Math {
    unlerp(value: number, a: number, b: number): number;
  }
}
