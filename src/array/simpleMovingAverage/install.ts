export * from './types';

export function installSimpleMovingAverage() {
  if (!Array.prototype.simpleMovingAverage) {
    Object.defineProperty(Array.prototype, 'simpleMovingAverage', {
      value<T>(
        this: readonly T[],
        fn: (val: T) => number,
        windowSize: number
      ): number[] {
        if (windowSize <= 0) throw new Error('windowSize must be > 0');
        if (this.length === 0) return [];

        const result: number[] = [];
        let sum = 0;

        for (let i = 0; i < this.length; i++) {
          sum += fn(this[i]);

          if (i >= windowSize) {
            sum -= fn(this[i - windowSize]);
          }

          if (i >= windowSize - 1) {
            result.push(sum / windowSize);
          }
        }

        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
