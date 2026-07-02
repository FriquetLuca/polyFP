export const exactlyN =
  <T>(n: number, ...preds: Array<(x: T) => boolean>) =>
  (x: T) =>
    preds.reduce((count, p) => count + (p(x) ? 1 : 0), 0) === n;
