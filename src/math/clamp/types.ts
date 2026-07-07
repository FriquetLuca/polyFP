export {};

declare global {
  interface Math {
    clamp(value: number, min: number, max: number): number;
  }
}
