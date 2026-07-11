import { repeat } from './index';
import './types';

if (!Math.repeat) {
  Object.defineProperty(Math, 'repeat', {
    value: repeat,
    writable: true,
    configurable: true,
  });
}
