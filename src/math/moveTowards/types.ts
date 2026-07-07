export {};

declare global {
  interface Math {
    moveTowards(value: number, target: number, maxDelta: number): number;
  }
}
