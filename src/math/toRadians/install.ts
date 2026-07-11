import { toRadians } from './index';
import './types';

if (!Math.toRadians) {
  Object.defineProperty(Math, 'toRadians', {
    value: toRadians,
    writable: true,
    configurable: true,
  });
}
