export {};

declare global {
  interface Math {
    roundToPointFive(x: number): number;
  }
}
