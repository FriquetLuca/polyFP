export {};

declare global {
  interface Math {
    lerpAngle(value: number, end: number, time: number): number;
  }
}
