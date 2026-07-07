export * from './types';

export function installCumulativeAverage() {
  if (!Array.prototype.cumulativeAverage) {
    Object.defineProperty(Array.prototype, 'cumulativeAverage', {
      value<T>(this: T[], fn: (val: T) => number): number[] {
        const result: number[] = [];
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
          sum += fn(this[i]);
          result.push(sum / (i + 1));
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
