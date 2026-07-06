export const max = <T>(arr: T[], fn: (val: T) => number) =>
  arr.length === 0
    ? 0
    : arr.reduce(
        (prev: number, current: T): number => Math.max(prev, fn(current)),
        Number.NEGATIVE_INFINITY
      );
