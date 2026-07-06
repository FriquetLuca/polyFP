export {};

declare global {
  interface Array<T> {
    shuffle(this: T[]): T[];
  }
  interface ReadonlyArray<T> {
    shuffle(this: readonly T[]): T[];
  }
}
