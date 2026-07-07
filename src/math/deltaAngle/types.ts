export {};

declare global {
  interface Math {
    deltaAngle(current: number, target: number): number;
  }
}
