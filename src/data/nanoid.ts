import { getRandomBytes } from './getRandomBytes';

const DEFAULT_ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';

export function nanoid(size = 21): string {
  const bytes = getRandomBytes(size);
  let id = '';
  // 64 chars allows direct 6-bit indexing (& 63) with zero modulo bias
  for (let i = 0; i < size; i++) {
    id += DEFAULT_ALPHABET[bytes[i] & 63];
  }
  return id;
}
