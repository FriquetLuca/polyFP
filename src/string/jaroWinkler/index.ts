import { jaro } from '../jaro/index.js';

export function jaroWinkler(a: string, b: string): number {
  const charsA = Array.from(a);
  const charsB = Array.from(b);
  const similarity = jaro(a, b);
  let prefix = 0;
  while (
    prefix < 4 &&
    prefix < charsA.length &&
    prefix < charsB.length &&
    charsA[prefix] === charsB[prefix]
  ) {
    prefix++;
  }
  return similarity + prefix * 0.1 * (1 - similarity);
}
