export const unary =
  <Args extends unknown[], R>(fn: (...args: Args) => R): ((args: Args) => R) =>
  (args: Args) =>
    fn(...args);
