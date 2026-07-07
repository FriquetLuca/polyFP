export * from './types';

export function installGeometricMean() {
  if (!Array.prototype.geometricMean) {
    Object.defineProperty(Array.prototype, 'geometricMean', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.length === 0
          ? Number.NaN
          : Math.pow(
              this.reduce((prev, curr) => {
                const v = fn(curr);
                if (v <= 0)
                  throw new Error(
                    'geometric mean requires strictly positive values'
                  );
                return prev * v;
              }, 1),
              1.0 / this.length
            );
      },
      writable: true,
      configurable: true,
    });
  }
}
