import { words } from '../words/index';

export const snakeCase = (value: string): string =>
  words(value).join('_').toLowerCase();
