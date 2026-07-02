export const atMostOne =
  <T>(...preds: Array<(x: T) => boolean>) =>
  (x: T): boolean => {
    let found = false;

    for (const p of preds) {
      if (p(x)) {
        if (found) return false;
        found = true;
      }
    }

    return true;
  };
