export {};

declare global {
  interface Function {
    retry<T, Args extends unknown[]>(
      this: (...args: Args) => Promise<T>,
      attempts: number
    ): (...args: Args) => Promise<T>;
  }
}
