export {};

declare global {
  interface Math {
    toRadians(degrees: number): number;
  }
}
