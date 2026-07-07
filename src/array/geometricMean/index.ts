export const geometricMean = <T>(arr: T[], fn: (val: T) => number): number =>
  arr.length === 0
    ? Number.NaN
    : Math.pow(
        arr.reduce((prev, curr) => {
          const v = fn(curr);
          if (v <= 0)
            throw new Error('geometric mean requires strictly positive values');
          return prev * v;
        }, 1),
        1.0 / arr.length
      );
