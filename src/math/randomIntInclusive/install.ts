import { randomIntInclusive } from './index';
import './types';

if (!Math.randomIntInclusive) {
  Object.defineProperty(Math, 'randomIntInclusive', {
    value: randomIntInclusive,
    writable: true,
    configurable: true,
  });
}
