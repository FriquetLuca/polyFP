export const flip =
  <A, B, TRest extends unknown[], TResult>(
    fn: (a: A, b: B, ...rest: TRest) => TResult
  ) =>
  (b: B, a: A, ...rest: TRest): TResult =>
    fn(a, b, ...rest);
