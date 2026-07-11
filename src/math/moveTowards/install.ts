import { moveTowards } from './index';
import './types';

if (!Math.moveTowards) {
  Object.defineProperty(Math, 'moveTowards', {
    value: moveTowards,
    writable: true,
    configurable: true,
  });
}
