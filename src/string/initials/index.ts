import { words } from '../words/index.js';

export const initials = (value: string): string =>
  words(value)
    .map((x) => x[0])
    .join('')
    .toUpperCase();
