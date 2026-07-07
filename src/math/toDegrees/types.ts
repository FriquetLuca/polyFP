export {};

declare global {
  interface Math {
    toDegrees(radians: number): number;
  }
}
