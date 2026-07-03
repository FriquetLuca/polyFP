export * from './types';

export function installZip() {
  if (!Array.prototype.zip) {
    Object.defineProperty(Array.prototype, 'zip', {
      value<A, B>(this: A[], bs: B[]): [A, B][] {
        const len = Math.min(this.length, bs.length);
        const out: [A, B][] = [];

        for (let i = 0; i < len; i++) {
          out.push([this[i], bs[i]]);
        }

        return out;
      },
      writable: true,
      configurable: true,
    });
  }
}
