export * from './types';

export function installPartition() {
  if (!Array.prototype.partition) {
    Object.defineProperty(Array.prototype, 'partition', {
      value<T>(this: T[], pred: (x: T) => boolean): [T[], T[]] {
        const yes: T[] = [];
        const no: T[] = [];

        for (const x of this) {
          (pred(x) ? yes : no).push(x);
        }

        return [yes, no];
      },
      writable: true,
      configurable: true,
    });
  }
}
