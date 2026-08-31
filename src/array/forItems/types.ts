export {};

declare global {
  interface Array<T> {
    forItems(
      this: T[],
      cb: (item: T, index: number, array: T[]) => void | 'break'
    ): void;
  }
  interface ReadonlyArray<T> {
    forItems(
      this: readonly T[],
      cb: (item: T, index: number, array: T[]) => void | 'break'
    ): void;
  }
}
