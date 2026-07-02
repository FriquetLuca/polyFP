export {};

declare global {
  interface FunctionConstructor {
    traverse<T, U>(
      items: Iterable<T>,
      fn: (item: T) => Promise<U>
    ): Promise<U[]>;
  }
}
