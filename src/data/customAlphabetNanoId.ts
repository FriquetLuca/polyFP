import { getRandomBytes } from './getRandomBytes';

export function customAlphabetNanoId(
  alphabet: string,
  defaultSize = 21
): (size?: number) => string {
  if (!alphabet || alphabet.length === 0) {
    throw new Error('Alphabet cannot be empty.');
  }

  // Calculate mask to avoid modulo bias (closest power of 2 minus 1)
  const mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
  // Calculate buffer step size based on alphabet mask ratio
  const step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);

  return (size = defaultSize): string => {
    let id = '';
    while (true) {
      const bytes = getRandomBytes(step);
      let i = step;
      while (i--) {
        // Bitwise AND with mask ensures uniform distribution
        const byte = bytes[i] & mask;
        if (byte < alphabet.length) {
          id += alphabet[byte];
          if (id.length === size) return id;
        }
      }
    }
  };
}
