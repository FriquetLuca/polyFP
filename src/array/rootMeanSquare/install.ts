export * from './types';

export function installRootMeanSquare() {
  if (!Array.prototype.rootMeanSquare) {
    Object.defineProperty(Array.prototype, 'rootMeanSquare', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.length === 0
          ? Number.NaN
          : Math.sqrt(
              this.reduce((prev, curr) => {
                const f = fn(curr);
                return prev + f * f;
              }, 1) / this.length
            );
      },
      writable: true,
      configurable: true,
    });
  }
}
