import { retry } from './index';
import './types';

if (!Function.retry) {
  Object.defineProperty(Function, 'retry', {
    value: retry,
    writable: true,
    configurable: true,
  });
}
