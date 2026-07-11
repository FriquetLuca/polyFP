import { isUUID } from './index';
import './types';

if (!String.prototype.isUUID) {
  Object.defineProperty(String.prototype, 'isUUID', {
    value(this: string, version?: number | undefined) {
      return isUUID(this, version);
    },
    writable: true,
    configurable: true,
  });
}
