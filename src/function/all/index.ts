export const all =
  <T>(preds: ((x: T) => boolean)[]) =>
  (x: T) =>
    preds.every((p) => p(x));
