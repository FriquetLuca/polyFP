import { randomInt } from './index';
import './types';

export function installRandomInt() {
  if (!Math.randomInt) {
    Object.defineProperty(Math, 'randomInt', {
      value: randomInt,
      writable: true,
      configurable: true,
    });
  }
}
