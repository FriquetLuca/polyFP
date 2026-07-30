import { isDate } from '../date/isDate/index.js';

export function comparePrimitive(
  a: unknown,
  b: unknown,
  locales?: Intl.LocalesArgument,
  options?: Intl.CollatorOptions
) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  if (isDate(a) && isDate(b)) {
    return a.getTime() - b.getTime();
  }
  return String(a).localeCompare(String(b), locales, options);
}
