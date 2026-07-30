import { erfc } from './index.js';
export type * from './types';

if (!Math.erfc) {
  Object.defineProperty(Math, 'erfc', {
    value: erfc,
    writable: true,
    configurable: true,
  });
}
