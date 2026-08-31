import { toChars } from '../toChars/index.js';

export function truncate(str: string, maxLength: number, suffix = '…'): string {
  const chars = toChars(str);
  if (chars.length <= maxLength) return str;
  const cutoff = Math.max(0, maxLength - suffix.length);
  return chars.slice(0, cutoff).join('') + suffix;
}
