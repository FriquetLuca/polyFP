import { match } from './index.js';
export type * from './types';

if (!Function.match) {
  Object.defineProperty(Function, 'match', {
    value: match,
    writable: true,
    configurable: true,
  });
}
