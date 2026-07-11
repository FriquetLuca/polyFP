import { randomIntInclusive } from './index';
import './types';

export function installRandomIntInclusive() {
  if (!Math.randomIntInclusive) {
    Object.defineProperty(Math, 'randomIntInclusive', {
      value: randomIntInclusive,
      writable: true,
      configurable: true,
    });
  }
}
