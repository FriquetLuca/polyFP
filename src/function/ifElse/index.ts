export const ifElse =
  <A, B, C>(
    predicate: (value: A) => boolean,
    onTrue: (value: A) => B,
    onFalse: (value: A) => C
  ): ((value: A) => B | C) =>
  (value: A) =>
    predicate(value) ? onTrue(value) : onFalse(value);
