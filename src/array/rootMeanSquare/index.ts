export const rootMeanSquare = <T>(arr: T[], fn: (val: T) => number): number =>
  arr.length === 0
    ? Number.NaN
    : Math.sqrt(
        arr.reduce((prev, curr) => {
          const f = fn(curr);
          return prev + f * f;
        }, 1) / arr.length
      );
