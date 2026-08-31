export {};

declare global {
  interface FunctionConstructor {
    tap<T>(
      effect: ((value: T) => void) | ((value: T) => Promise<void>)
    ): (value: T) => T;
  }
}
