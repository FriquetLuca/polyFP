export {};

declare global {
  interface FunctionConstructor {
    throttle<Args extends unknown[]>(
      fn: (...args: Args) => void,
      waitMs: number
    ): ((...args: Args) => void) & {
      cancel: () => void;
    };
  }
}
