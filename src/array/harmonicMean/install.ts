export * from './types';

export function installHarmonicMean() {
  if (!Array.prototype.harmonicMean) {
    Object.defineProperty(Array.prototype, 'harmonicMean', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.length === 0
          ? Number.NaN
          : this.length /
              this.reduce((prev, curr) => {
                const v = fn(curr);
                if (v === 0)
                  throw new Error('harmonic mean requires non-zero values');
                return prev + 1 / v;
              }, 0);
      },
      writable: true,
      configurable: true,
    });
  }
}
