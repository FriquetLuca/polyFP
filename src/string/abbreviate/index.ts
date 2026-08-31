import { toChars } from '../toChars/index.js';

export function abbreviate(
  value: string,
  maxLength: number,
  exactLength = false
): string {
  const chars = toChars(value);
  if (chars.length <= maxLength) return value;

  if (exactLength && maxLength <= 3) return chars.slice(0, maxLength).join('');
  const cutoff = exactLength ? maxLength - 3 : maxLength;
  return chars.slice(0, cutoff).join('') + '...';
}
