export function gcd(a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b))
    throw new Error('The CDG can only be computed for integers');
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}
