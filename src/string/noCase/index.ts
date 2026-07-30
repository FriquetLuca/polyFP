import { words } from '../words/index.js';

export const noCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .join(' ');
