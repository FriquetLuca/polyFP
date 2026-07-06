export const min = <T>(arr: T[], fn: (val: T) => number) =>
  arr.length === 0
    ? 0
    : arr.reduce(
        (prev: number, current: T): number => Math.min(prev, fn(current)),
        Number.POSITIVE_INFINITY
      );
