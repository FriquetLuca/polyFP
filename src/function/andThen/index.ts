export const andThen =
  <A, B>(
    f: (a: NonNullable<A>) => B
  ): ((fa: A) => B | Extract<A, null | undefined>) =>
  (fa: A) =>
    fa == null ? (fa as Extract<A, null | undefined>) : f(fa as NonNullable<A>);
