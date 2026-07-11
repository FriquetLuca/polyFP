import { isPromise } from './index';
import './types';

if (!Function.isPromise) {
  Object.defineProperty(Function, 'isPromise', {
    value: isPromise,
    writable: true,
    configurable: true,
  });
}
