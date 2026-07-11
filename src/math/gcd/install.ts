import { gcd } from './index';
import './types';

if (!Math.gcd) {
  Object.defineProperty(Math, 'gcd', {
    value: gcd,
    writable: true,
    configurable: true,
  });
}
