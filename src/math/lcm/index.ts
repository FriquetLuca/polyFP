import { gcd } from '../gcd';

export function lcm(a: number, b: number) {
  if (!Number.isInteger(a) || !Number.isInteger(b))
    throw new Error('The LCM can only be computed for integers');
  if (a == 0 || b == 0) return 0;
  return Math.abs((a / gcd(a, b)) * b);
}
