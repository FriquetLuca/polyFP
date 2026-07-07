export {};

declare global {
  interface Math {
    remap(
      value: number,
      oldMin: number,
      oldMax: number,
      newMin: number,
      newMax: number
    ): number;
  }
}
