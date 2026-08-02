export {};

declare global {
  interface Array<T> {
    xor(a: T[], b: T[]): T[];
  }
  interface ReadonlyArray<T> {
    xor(a: readonly T[], b: T[]): T[];
  }
}
