import { cryptoObj } from '../utils.js';

const hasCryptoRandom = typeof cryptoObj?.randomUUID === 'function';

export function uuidv4(): `${string}-${string}-${string}-${string}-${string}` {
  if (hasCryptoRandom) {
    return cryptoObj!.randomUUID!();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }) as `${string}-${string}-${string}-${string}-${string}`;
}
