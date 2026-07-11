import { renameKeys } from './index';
import './types';

if (!Object.renameKeys) {
  Object.defineProperty(Object, 'renameKeys', {
    value: renameKeys,
    writable: true,
    configurable: true,
  });
}
