export const exactlyOne =
  <T>(...preds: Array<(x: T) => boolean>) =>
  (x: T): boolean => {
    let count = 0;

    for (const p of preds) {
      if (p(x)) {
        count++;
        if (count > 1) return false;
      }
    }

    return count === 1;
  };
