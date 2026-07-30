import { clerp180 } from './index.js';
export type * from './types';

if (!Math.clerp180) {
  Object.defineProperty(Math, 'clerp180', {
    value: clerp180,
    writable: true,
    configurable: true,
  });
}
