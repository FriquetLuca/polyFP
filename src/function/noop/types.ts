export {};

declare global {
  interface FunctionConstructor {
    noop<T>(..._args: T[]): void;
  }
}
