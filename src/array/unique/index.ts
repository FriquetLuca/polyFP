export const unique = <T>(arr: readonly T[]): T[] => [...new Set(arr)];
