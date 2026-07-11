import { memoize } from './index';
import './types';

if (!Function.memoize) {
  Object.defineProperty(Function, 'memoize', {
    value: memoize,
    writable: true,
    configurable: true,
  });
}
