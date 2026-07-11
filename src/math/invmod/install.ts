import { invmod } from './index';
import './types';

if (!Math.invmod) {
  Object.defineProperty(Math, 'invmod', {
    value: invmod,
    writable: true,
    configurable: true,
  });
}
