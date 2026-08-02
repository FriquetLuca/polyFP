export const ipv4RegExpStr =
  '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])';
export const ipv6RegExpStr =
  '(?:' +
  '(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}' +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,7}:' +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}' +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,5}(?::[0-9a-f]{1,4}){1,2}' +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,4}(?::[0-9a-f]{1,4}){1,3}' +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,3}(?::[0-9a-f]{1,4}){1,4}' +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,2}(?::[0-9a-f]{1,4}){1,5}' +
  '|' +
  '[0-9a-f]{1,4}:(?:(?::[0-9a-f]{1,4}){1,6})' +
  '|' +
  ':(?:(?::[0-9a-f]{1,4}){1,7}|:)' +
  '|' +
  'fe80:(?::[0-9a-f]{0,4}){0,4}%[0-9a-zA-Z]+' +
  '|' +
  '::(?:ffff(?::0{1,4})?:)?' +
  ipv4RegExpStr +
  '|' +
  '(?:[0-9a-f]{1,4}:){1,4}:' +
  ipv4RegExpStr +
  ')';
export const ipv6URLRegExpStr: string = '(?:\\[' + ipv6RegExpStr + '\\])';
export const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
};
export const unescapeMap: Record<string, string> = Object.fromEntries(
  Object.entries(escapeMap).map(([key, value]) => [value, key])
);
export const createEscaper = (
  map: Record<string, string>
): ((input: string) => string) => {
  const escaper = (match: string): string => map[match] ?? match;
  const source = `(?:${Object.keys(map).join('|')})`;
  const testRegexp = new RegExp(source);
  const replaceRegexp = new RegExp(source, 'g');
  return (input: string): string =>
    testRegexp.test(input) ? input.replace(replaceRegexp, escaper) : input;
};
