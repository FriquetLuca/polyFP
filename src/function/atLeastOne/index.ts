export const atLeastOne =
  <T>(...preds: ((x: T) => boolean)[]) =>
  (x: T) =>
    preds.some((p) => p(x));
