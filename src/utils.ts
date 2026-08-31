export const cryptoObj: Crypto | undefined = globalThis.crypto;

export const hasCryptoGetRandomValues =
  typeof cryptoObj?.getRandomValues === 'function';

export function extendPrototype<T extends object>(
  proto: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, (this: T, ...args: any[]) => any>
) {
  for (const [key, fn] of Object.entries(props)) {
    if (!Object.prototype.hasOwnProperty.call(proto, key)) {
      Object.defineProperty(proto, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: fn,
      });
    }
  }
}
