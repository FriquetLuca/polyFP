export function hamming(a: string, b: string): number {
  if (a.length !== b.length)
    throw new Error('Strings must have the same length.');
  const charsA = Array.from(a);
  const charsB = Array.from(b);
  let distance = 0;
  for (let i = 0; i < charsA.length; i++) {
    if (charsA[i] !== charsB[i]) {
      distance++;
    }
  }
  return distance;
}
