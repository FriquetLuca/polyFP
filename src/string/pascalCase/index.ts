import { upperFirst } from '../upperFirst/index.js';
import { words } from '../words/index.js';

export const pascalCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .map(upperFirst)
    .join('');
