import { noCase } from '../noCase/index.js';

export function sentenceCase(value: string): string {
  const text = noCase(value);
  if (text.length === 0) return '';
  return text[0].toUpperCase() + text.slice(1);
}
