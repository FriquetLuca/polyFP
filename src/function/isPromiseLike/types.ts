export {};

declare global {
  interface FunctionConstructor {
    isPromiseLike(value: unknown): value is PromiseLike<unknown>;
  }
}
