import { isPrime } from './index';
import './types';

if (!Math.isPrime) {
  Object.defineProperty(Math, 'isPrime', {
    value: isPrime,
    writable: true,
    configurable: true,
  });
}
