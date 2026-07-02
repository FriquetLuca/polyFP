export const and =
  <T>(...preds: Array<(x: T) => boolean>) =>
  (x: T) =>
    preds.every((p) => p(x));
