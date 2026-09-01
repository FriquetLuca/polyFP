import { hasCryptoGetRandomValues, cryptoObj } from '../utils.js';

export function getRandomBytes(size: number): Uint8Array {
  const bytes = new Uint8Array(size);
  if (hasCryptoGetRandomValues) {
    cryptoObj!.getRandomValues(bytes);
  } else {
    for (let i = 0; i < size; i++) {
      bytes[i] = (Math.random() * 256) | 0;
    }
  }
  return bytes;
}
