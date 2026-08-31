export {};

declare global {
  interface Function {
    flip<A, B, TRest extends unknown[], TResult>(
      this: (a: A, b: B, ...rest: TRest) => TResult
    ): (b: B, a: A, ...rest: TRest) => TResult;
  }
}
