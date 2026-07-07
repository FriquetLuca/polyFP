export {};

declare global {
  interface Math {
    moveTowardsAngle(value: number, target: number, maxDelta: number): number;
  }
}
