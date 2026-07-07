export function gcd(a: number, b: number) {
  if (!Number.isInteger(a) || !Number.isInteger(b))
    throw new Error('The CDG can only be computed for integers');
  let remainder;
  let tempA = a;
  let tempB = b;
  while (tempB != 0) {
    remainder = tempA % tempB;
    tempA = tempB;
    tempB = remainder;
  }
  return tempA < 0 ? -tempA : tempA;
}
