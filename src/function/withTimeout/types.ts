export {};

declare global {
  interface FunctionConstructor {
    withTimeout<T>(
      fn: (signal: AbortSignal) => Promise<T>,
      ms: number
    ): Promise<T>;
  }
}
