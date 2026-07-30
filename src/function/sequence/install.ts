import { sequence } from './index.js';
export type * from './types';

if (!Function.sequence) {
  Object.defineProperty(Function, 'sequence', {
    value: sequence,
    writable: true,
    configurable: true,
  });
}
