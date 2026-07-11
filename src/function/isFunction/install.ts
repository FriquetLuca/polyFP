import { isFunction } from './index';
import './types';

if (!Function.isFunction) {
  Object.defineProperty(Function, 'isFunction', {
    value: isFunction,
    writable: true,
    configurable: true,
  });
}
