const RE_COMPLETE_DATE = new RegExp(
  '(?:' +
    '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])|' + // Extended Calendar: YYYY-MM-DD
    '(?:\\d{4}|\\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])|' + // Basic Calendar: YYYYMMDD / YYMMDD (supports your '260709')
    '\\d{4}-W(?:0[1-9]|[1-4]\\d|5[0-3])-[1-7]|' + // Extended Week: YYYY-Www-D
    '\\d{4}W(?:0[1-9]|[1-4]\\d|5[0-3])[1-7]|' + // Basic Week: YYYYWwwD
    '\\d{4}-(?:00[1-9]|0[1-9]\\d|[12]\\d{2}|3[0-5]\\d|36[0-6])|' + // Extended Ordinal: YYYY-DDD
    '\\d{4}(?:00[1-9]|0[1-9]\\d|[12]\\d{2}|3[0-5]\\d|36[0-6])' + // Basic Ordinal: YYYYDDD
    ')'
);
const RE_REDUCED_DATE = new RegExp(
  '(?:' +
    '\\d{4}-(?:0[1-9]|1[0-2])|' + // Extended Month: YYYY-MM
    '\\d{4}-W(?:0[1-9]|[1-4]\\d|5[0-3])|' + // Extended Week-only: YYYY-Www
    '\\d{4}W(?:0[1-9]|[1-4]\\d|5[0-3])|' + // Basic Week-only: YYYYWww
    '\\d{4}' + // Year Only: YYYY
    ')'
);

const RE_TIME = /(?:T?(?:[01]\d|2[0-3])(?:[:.]?(?:[0-5]\d)){0,2}(?:[.,]\d+)?)/;
const RE_ZONE = /(Z|([+-])([01]\d|2[0-3])(:?([0-5]\d))?)?/;

const ISO_REGEX = new RegExp(
  '^' +
    '(?:' +
    '(?:' +
    RE_COMPLETE_DATE.source +
    ')(?:' +
    RE_TIME.source +
    ')?' +
    RE_ZONE.source +
    '|' +
    '(?:' +
    RE_REDUCED_DATE.source +
    ')' +
    ')' +
    '$'
);
// Source: https://en.wikipedia.org/wiki/ISO_8601
// Not everything is included, it should be almost
// entirely Web-Standard (RFC 3339) compliant
export const isDateFormat = (value: string) => ISO_REGEX.test(value);
