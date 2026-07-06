export const product = <T>(arr: T[], fn: (val: T) => number) =>
  arr.reduce((prev: number, current: T): number => prev * fn(current), 1);
