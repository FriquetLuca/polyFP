import { words } from '../words/index.js';

export const dotCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .join('.');
