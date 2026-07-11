import { ipv4RegExpStr, ipv6URLRegExpStr } from '../utils';

const credentials = '(?:[^\\s@/]+(?::[^\\s@/]*)?@)?';
const standardDomain = '(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2,}';

const url: RegExp = new RegExp(
  '^' +
    '(?:' +
    // Protocol is explicitly present
    '(?:[a-z][a-z\\d+.-]*://)' + // Protocol
    credentials + // Credentials
    '(?:' +
    standardDomain + // Standard domain
    '|' +
    'localhost' + // Localhost
    '|' +
    '[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?' + // Single-word host
    '|' +
    ipv6URLRegExpStr + // IPv6
    '|' +
    ipv4RegExpStr + // IPv4
    ')' +
    '|' +
    // Protocol is missing
    credentials + // Credentials
    '(?:' +
    standardDomain + // Standard domain
    '|' +
    'localhost' + // Localhost
    '|' +
    ipv6URLRegExpStr + // IPv6
    '|' +
    ipv4RegExpStr + // IPv4
    ')' +
    ')' +
    // Port, Path, Query, Fragment
    '(?::(?:[0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?' + // Port
    '(?:\\/[^\\s?#]*)?' + // Path
    '(?:\\?[^\\s#]*)?' + // Query
    '(?:#[^\\s]*)?' + // Fragment
    '$',
  'i'
);

export const isURL = (value: string): boolean => url.test(value);
