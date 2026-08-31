import { cryptoObj, hasCryptoGetRandomValues } from '../../utils.js';
import { toChars } from '../toChars/index.js';

export function randomStr(
  length: number,
  chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
): string {
  if (!Number.isInteger(length) || length < 0)
    throw new Error('length must be a non-negative integer');
  if (chars.length === 0) throw new Error('chars cannot be empty');

  const charList = toChars(chars);
  let str = '';
  if (hasCryptoGetRandomValues) {
    const bytes = new Uint32Array(length);
    cryptoObj!.getRandomValues!(bytes);
    for (let i = 0; i < length; i++) {
      str += charList[bytes[i] % charList.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      str += charList[Math.floor(Math.random() * charList.length)];
    }
  }
  return str;
}
