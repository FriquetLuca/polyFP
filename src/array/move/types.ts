export {};

declare global {
  interface Array<T> {
    move(this: T[], from: number, to: number): T[];
  }
  interface ReadonlyArray<T> {
    move(this: readonly T[], from: number, to: number): T[];
  }
}
