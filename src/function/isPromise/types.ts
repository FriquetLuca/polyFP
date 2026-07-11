export {};

declare global {
  interface FunctionConstructor {
    isPromise(value: unknown): value is Promise<unknown>;
  }
}
