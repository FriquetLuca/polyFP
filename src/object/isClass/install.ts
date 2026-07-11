import { isClass } from './index';
import './types';

if (!Object.isClass) {
  Object.defineProperty(Object, 'isClass', {
    value: isClass,
    writable: true,
    configurable: true,
  });
}
