export {};

declare global {
  interface FunctionConstructor {
    sequence<T>(promises: Iterable<Promise<T>>): Promise<T[]>;
  }
}
