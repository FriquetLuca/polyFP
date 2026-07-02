import { retry } from './index';
import './types';

export function installRetry() {
  if (!Function.retry) {
    Object.defineProperty(Function, 'retry', {
      value: retry,
      writable: true,
      configurable: true,
    });
  }
}
