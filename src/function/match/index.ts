export const match =
  <T extends string | number | symbol, TResult>(
    cases: Record<T, () => TResult>
  ) =>
  (value: T) =>
    cases[value]();
