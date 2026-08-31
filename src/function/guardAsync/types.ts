export {};

declare global {
  interface Function {
    guardAsync<T, Args extends unknown[]>(
      this: (...args: Args) => Promise<T>,
      fallback: T
    ): (...args: Args) => Promise<T>;
  }
}
