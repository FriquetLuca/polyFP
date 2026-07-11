import { select } from './index';
import './types';

if (!Object.select) {
  Object.defineProperty(Object, 'select', {
    value: select,
    writable: true,
    configurable: true,
  });
}
