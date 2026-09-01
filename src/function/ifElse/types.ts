export {};

declare global {
  interface FunctionConstructor {
    ifElse<A, B, C>(
      predicate: (value: A) => boolean,
      onTrue: (value: A) => B,
      onFalse: (value: A) => C
    ): (value: A) => B | C;
  }
}
