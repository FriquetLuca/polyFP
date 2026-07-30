import { mod } from './index.js';
export type * from './types';

if (!Math.mod) {
  Object.defineProperty(Math, 'mod', {
    value: mod,
    writable: true,
    configurable: true,
  });
}
