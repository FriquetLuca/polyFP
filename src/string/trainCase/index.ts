import { upperFirst } from '../upperFirst/index';
import { words } from '../words/index';

export const trainCase = (value: string): string =>
  words(value)
    .map((x) => x.toLowerCase())
    .map(upperFirst)
    .join('-');
