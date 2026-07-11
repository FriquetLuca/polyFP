import { exactlyOne } from './index';
import './types';

if (!Function.exactlyOne) {
  Object.defineProperty(Function, 'exactlyOne', {
    value: exactlyOne,
    writable: true,
    configurable: true,
  });
}
