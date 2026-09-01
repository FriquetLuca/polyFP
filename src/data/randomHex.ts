import { cryptoObj, hasCryptoGetRandomValues } from '../utils.js';

export function randomHex(count: number): string {
  if (hasCryptoGetRandomValues) {
    const bytes = new Uint8Array(Math.ceil(count / 2));
    cryptoObj!.getRandomValues(bytes);
    let hex = '';
    for (const byte of bytes) hex += byte.toString(16).padStart(2, '0');
    return hex.slice(0, count);
  }
  let hex = '';
  for (let i = 0; i < count; i++) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  return hex;
}
