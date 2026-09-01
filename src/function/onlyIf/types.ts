export {};

declare global {
  interface FunctionConstructor {
    onlyIf<A, B>(
      predicate: (value: A) => boolean,
      onTrue: (value: A) => B
    ): (value: A) => B | undefined;
  }
}
