export const onlyIf =
  <A, B>(
    predicate: (value: A) => boolean,
    onTrue: (value: A) => B
  ): ((value: A) => B | undefined) =>
  (value: A) =>
    predicate(value) ? onTrue(value) : undefined;
