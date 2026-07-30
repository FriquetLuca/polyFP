import { words } from '../words/index.js';

export const snakeCase = (value: string): string =>
  words(value).join('_').toLowerCase();
