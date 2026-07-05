export {};

declare global {
  interface Array<T> {
    forItemsReverse(
      this: T[],
      cb: (item: T, index: number, array: T[]) => void | 'break'
    ): void;
  }
  interface ReadonlyArray<T> {
    forItemsReverse(
      this: readonly T[],
      cb: (item: T, index: number, array: T[]) => void | 'break'
    ): void;
  }
}
