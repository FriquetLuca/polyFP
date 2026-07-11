import { words } from '../words/index';
import { upperFirst } from '../upperFirst/index';

export const titleCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .map(upperFirst)
    .join(' ');
