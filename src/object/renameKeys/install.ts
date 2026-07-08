import { renameKeys } from './index';
import './types';

export function installRenameKeys() {
  if (!Object.renameKeys) {
    Object.defineProperty(Object, 'renameKeys', {
      value: renameKeys,
      writable: true,
      configurable: true,
    });
  }
}
