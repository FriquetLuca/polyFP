import { all } from './index';
import './types';

if (!Function.all) {
  Object.defineProperty(Function, 'all', {
    value: all,
    writable: true,
    configurable: true,
  });
}
