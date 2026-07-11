import { isPromiseLike } from './index';
import './types';

if (!Function.isPromiseLike) {
  Object.defineProperty(Function, 'isPromiseLike', {
    value: isPromiseLike,
    writable: true,
    configurable: true,
  });
}
