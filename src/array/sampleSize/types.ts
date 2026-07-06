export {};

declare global {
  interface Array<T> {
    sampleSize(this: T[], size: number): T[];
  }
  interface ReadonlyArray<T> {
    sampleSize(this: readonly T[], size: number): T[];
  }
}
