import { words } from '../words/index';

export const noCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .join(' ');
