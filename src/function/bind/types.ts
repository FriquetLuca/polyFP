export {};

declare global {
  interface FunctionConstructor {
    bind<A, B>(
      fa: A,
      f: (a: NonNullable<A>) => B
    ): B | Extract<A, null | undefined>;
  }
}
