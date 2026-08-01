export function getRandomBytes(size: number): Uint8Array {
  const bytes = new Uint8Array(size);
  const g = globalThis as unknown as {
    crypto?: {
      getRandomValues?: (array: Uint8Array) => Uint8Array;
    };
  };

  if (typeof g.crypto?.getRandomValues === 'function') {
    g.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < size; i++) {
      bytes[i] = (Math.random() * 256) | 0;
    }
  }
  return bytes;
}
