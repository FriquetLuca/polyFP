export function bind<A, B>(
  fa: A,
  f: (a: NonNullable<A>) => B
): B | Extract<A, null | undefined> {
  if (fa == null) {
    return fa as Extract<A, null | undefined>;
  }
  return f(fa as NonNullable<A>);
}
