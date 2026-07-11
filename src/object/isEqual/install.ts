import { isEqual } from './index';
import './types';

if (!Object.isEqual) {
  Object.defineProperty(Object, 'isEqual', {
    value: isEqual,
    writable: true,
    configurable: true,
  });
}
