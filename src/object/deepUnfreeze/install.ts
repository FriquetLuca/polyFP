import { deepUnfreeze } from './index';
import './types';

if (!Object.deepUnfreeze) {
  Object.defineProperty(Object, 'deepUnfreeze', {
    value: deepUnfreeze,
    writable: true,
    configurable: true,
  });
}
