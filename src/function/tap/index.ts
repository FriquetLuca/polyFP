export const tap =
  <T>(effect: (value: T) => void): ((value: T) => T) =>
  (value: T): T => {
    effect(value);
    return value;
  };
