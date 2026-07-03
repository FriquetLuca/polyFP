export function partition<T>(arr: T[], pred: (x: T) => boolean): [T[], T[]] {
  const yes: T[] = [];
  const no: T[] = [];

  for (const x of arr) {
    (pred(x) ? yes : no).push(x);
  }

  return [yes, no];
}
