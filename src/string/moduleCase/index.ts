import { words } from '../words/index.js';

export const moduleCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .join('/');
