export {};

declare global {
  interface Function {
    partial<TBound extends unknown[], TArgs extends unknown[], TResult>(
      this: (...args: [...TBound, ...TArgs]) => TResult,
      ...boundArgs: TBound
    ): (...remainingArgs: TArgs) => TResult;
  }
}
