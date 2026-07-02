import { isPlainObject } from './index';
import './types';

export function installIsPlainObject() {
  if (!Object.isPlainObject) {
    Object.defineProperty(Object, 'isPlainObject', {
      value: isPlainObject,
      writable: true,
      configurable: true,
    });
  }
}
