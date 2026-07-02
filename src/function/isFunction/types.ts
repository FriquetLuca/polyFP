export {};

declare global {
  interface FunctionConstructor {
    isFunction<T>(obj: T): boolean;
  }
}
