export function unzip<A, B>(arr: [A, B][]): [A[], B[]] {
  const as: A[] = [];
  const bs: B[] = [];

  for (const [a, b] of arr) {
    as.push(a);
    bs.push(b);
  }

  return [as, bs];
}
