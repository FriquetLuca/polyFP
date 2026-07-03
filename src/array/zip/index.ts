export function zip<A, B>(as: A[], bs: B[]): [A, B][] {
  const len = Math.min(as.length, bs.length);
  const out: [A, B][] = [];

  for (let i = 0; i < len; i++) {
    out.push([as[i], bs[i]]);
  }

  return out;
}
