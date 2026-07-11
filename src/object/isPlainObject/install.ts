import { isPlainObject } from './index';
import './types';

if (!Object.isPlainObject) {
  Object.defineProperty(Object, 'isPlainObject', {
    value: isPlainObject,
    writable: true,
    configurable: true,
  });
}
