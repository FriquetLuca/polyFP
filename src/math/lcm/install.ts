import { lcm } from './index';
import './types';

if (!Math.lcm) {
  Object.defineProperty(Math, 'lcm', {
    value: lcm,
    writable: true,
    configurable: true,
  });
}
