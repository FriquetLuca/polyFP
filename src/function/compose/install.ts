import { compose } from './index.js';
export type * from './types';

if (!Function.compose) {
  Object.defineProperty(Function, 'compose', {
    value: compose,
    writable: true,
    configurable: true,
  });
}
