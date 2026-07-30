import { words } from '../words/index.js';

export const kebabCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .join('-');
