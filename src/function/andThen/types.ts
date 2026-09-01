export {};

declare global {
  interface Function {
    andThen<A, B>(
      this: (a: NonNullable<A>) => B
    ): (fa: A) => B | Extract<A, null | undefined>;
  }
}
