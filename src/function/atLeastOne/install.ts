import { atLeastOne } from './index';
import './types';

if (!Function.atLeastOne) {
  Object.defineProperty(Function, 'atLeastOne', {
    value: atLeastOne,
    writable: true,
    configurable: true,
  });
}
