import { randomInt } from './index';
import './types';

if (!Math.randomInt) {
  Object.defineProperty(Math, 'randomInt', {
    value: randomInt,
    writable: true,
    configurable: true,
  });
}
