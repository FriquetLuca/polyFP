import { saturate } from './index.js';
export type * from './types';

if (!Math.saturate) {
  Object.defineProperty(Math, 'saturate', {
    value: saturate,
    writable: true,
    configurable: true,
  });
}
