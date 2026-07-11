import { clamp } from './index';
import './types';

if (!Math.clamp) {
  Object.defineProperty(Math, 'clamp', {
    value: clamp,
    writable: true,
    configurable: true,
  });
}
