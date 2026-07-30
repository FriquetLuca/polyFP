import { words } from '../words/index.js';

export const constantCase = (value: string): string =>
  words(value)
    .map((x) => x.toUpperCase())
    .join('_');
