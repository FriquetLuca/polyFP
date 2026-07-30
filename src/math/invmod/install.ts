import { invmod } from './index.js';
export type * from './types';

if (!Math.invmod) {
  Object.defineProperty(Math, 'invmod', {
    value: invmod,
    writable: true,
    configurable: true,
  });
}
