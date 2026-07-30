import { words } from '../words/index.js';
import { upperFirst } from '../upperFirst/index.js';

export const titleCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .map(upperFirst)
    .join(' ');
