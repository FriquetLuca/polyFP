export {};

declare global {
  interface Array<T> {
    filterMap<U>(
      this: T[],
      mapper: (value: T, index: number, array: T[]) => U | null | undefined
    ): U[];
  }
  interface ReadonlyArray<T> {
    filterMap<U>(
      this: readonly T[],
      mapper: (value: T, index: number, array: T[]) => U | null | undefined
    ): U[];
  }
}
