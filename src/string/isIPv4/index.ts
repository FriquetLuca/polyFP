import { ipv4RegExpStr } from '../utils';

const ip4: RegExp = new RegExp('^' + ipv4RegExpStr + '$', 'i');

export const isIPv4 = (value: string) => ip4.test(value);
