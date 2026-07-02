export const partition =
  <T>(pred: (x: T) => boolean) =>
  (arr: readonly T[]): [T[], T[]] => {
    const yes: T[] = [];
    const no: T[] = [];

    for (const x of arr) {
      (pred(x) ? yes : no).push(x);
    }

    return [yes, no];
  };
