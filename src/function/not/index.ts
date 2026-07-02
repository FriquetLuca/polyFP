export const not =
  <T>(p: (x: T) => boolean) =>
  (x: T) =>
    !p(x);
