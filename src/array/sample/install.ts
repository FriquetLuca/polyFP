import { none, some, type Option } from '../../data/option';

export * from './types';

export function installSample() {
  if (!Array.prototype.sample) {
    Object.defineProperty(Array.prototype, 'sample', {
      value<T>(this: T[]): Option<T> {
        return this.length === 0
          ? none()
          : some(this[(Math.random() * this.length) | 0]);
      },
      writable: true,
      configurable: true,
    });
  }
}
