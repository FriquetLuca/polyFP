export const harmonicMean = <T>(arr: T[], fn: (val: T) => number): number =>
  arr.length === 0
    ? Number.NaN
    : arr.length /
      arr.reduce((prev, curr) => {
        const v = fn(curr);
        if (v === 0) throw new Error('harmonic mean requires non-zero values');
        return prev + 1 / v;
      }, 0);
