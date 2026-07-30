import { xgcd } from './index.js';
export type * from './types';

if (!Math.xgcd) {
  Object.defineProperty(Math, 'xgcd', {
    value: xgcd,
    writable: true,
    configurable: true,
  });
}
