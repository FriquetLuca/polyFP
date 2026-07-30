import { gamma } from './index.js';
export type * from './types';

if (!Math.gamma) {
  Object.defineProperty(Math, 'gamma', {
    value: gamma,
    writable: true,
    configurable: true,
  });
}
