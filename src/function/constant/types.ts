export {};

declare global {
  interface FunctionConstructor {
    constant<T>(value: T): () => T;
  }
}
