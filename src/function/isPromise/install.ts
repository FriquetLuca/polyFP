import { isPromise } from './index';
import './types';

export function installIsPromise() {
  if (!Function.isPromise) {
    Object.defineProperty(Function, 'isPromise', {
      value: isPromise,
      writable: true,
      configurable: true,
    });
  }
}
