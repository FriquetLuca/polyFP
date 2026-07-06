export const avg = <T>(arr: T[], fn: (val: T) => number) =>
  arr.length === 0
    ? 0
    : arr.reduce((prev: number, current: T): number => prev + fn(current), 0) /
      arr.length;
