export const pluck =
  <T, K extends keyof T>(key: K) =>
  (arr: readonly T[]): T[K][] =>
    arr.map((x) => x[key]);
