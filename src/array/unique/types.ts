export {};

declare global {
  interface Array<T> {
    unique(this: T[]): T[];
  }
  interface ReadonlyArray<T> {
    unique(this: T[]): T[];
  }
}
