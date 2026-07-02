export {};

declare global {
  interface FunctionConstructor {
    tap<T>(effect: (value: T) => void): (value: T) => T;
  }
}
