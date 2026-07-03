export const pluck = <T, K extends keyof T>(arr: T[], key: K): T[K][] =>
  arr.map((x) => x[key]);
