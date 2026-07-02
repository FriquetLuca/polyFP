export const or =
  <T>(...preds: Array<(x: T) => boolean>) =>
  (x: T) =>
    preds.some((p) => p(x));
