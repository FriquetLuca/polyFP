import { frac } from './index';
import './types';

if (!Math.frac) {
  Object.defineProperty(Math, 'frac', {
    value: frac,
    writable: true,
    configurable: true,
  });
}
