// Extended format: requires colons
const extendedRegex =
  /^(T?[01]\d|2[0-3])(?::([0-5]\d))?(?::([0-5]\d))?([.,](\d{1,3}))?$/;
// Basic format: no colons allowed
const basicRegex = /^(T?[01]\d|2[0-3])([0-5]\d)?([0-5]\d)?([.,](\d{1,3}))?$/;

export const isTime = (time: string): boolean =>
  time.includes(':') ? extendedRegex.test(time) : basicRegex.test(time);
