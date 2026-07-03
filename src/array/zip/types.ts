export {};

declare global {
  interface Array<T> {
    zip<B>(this: T[], bs: B[]): [T, B][];
  }
  interface ReadonlyArray<T> {
    zip<B>(this: T[], bs: B[]): [T, B][];
  }
}
