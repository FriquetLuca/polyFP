export const chunk =
  (size: number) =>
  <T>(arr: readonly T[]): T[][] => {
    const result: T[][] = [];

    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }

    return result;
  };
