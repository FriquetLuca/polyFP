import { deepFreeze } from './index';
import './types';

if (!Object.deepFreeze) {
  Object.defineProperty(Object, 'deepFreeze', {
    value: deepFreeze,
    writable: true,
    configurable: true,
  });
}
