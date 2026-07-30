export {};

declare global {
  interface Math {
    segmentRounding(x: number, segments: number, precision?: number): number;
  }
}
