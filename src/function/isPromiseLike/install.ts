import { isPromiseLike } from './index';
import './types';

export function installIsPromiseLike() {
  if (!Function.isPromiseLike) {
    Object.defineProperty(Function, 'isPromiseLike', {
      value: isPromiseLike,
      writable: true,
      configurable: true,
    });
  }
}
