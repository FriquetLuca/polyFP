import { repeat } from './index.js';
export type * from './types';

if (!Math.repeat) {
  Object.defineProperty(Math, 'repeat', {
    value: repeat,
    writable: true,
    configurable: true,
  });
}
