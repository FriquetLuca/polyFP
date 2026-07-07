import { xgcd } from '../xgcd';

export function invmod(a: number, b: number): number {
  const originalB = b;
  a = ((a % b) + b) % b;
  const { gcd, x } = xgcd(a, b);
  if (gcd !== 1)
    throw new Error(`No modular inverse exists for ${a} mod ${originalB}`);
  return ((x % originalB) + originalB) % originalB;
}
