export const window =
  (size: number) =>
  <T>(arr: readonly T[]): T[][] => {
    const result: T[][] = [];

    for (let i = 0; i <= arr.length - size; i++) {
      result.push(arr.slice(i, i + size));
    }

    return result;
  };
