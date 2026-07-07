export * from './types';

export function installExponentialMovingAverage() {
  if (!Array.prototype.exponentialMovingAverage) {
    Object.defineProperty(Array.prototype, 'exponentialMovingAverage', {
      value<T>(this: T[], fn: (val: T) => number, alpha: number): number[] {
        if (alpha <= 0 || alpha > 1) throw new Error('alpha must be in (0, 1]');
        if (this.length === 0) return [];
        const result: number[] = [];
        let ema = fn(this[0]);
        result.push(ema);
        for (let i = 1; i < this.length; i++) {
          ema = alpha * fn(this[i]) + (1 - alpha) * ema;
          result.push(ema);
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
