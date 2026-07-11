import { atMostOne } from './index';
import './types';

if (!Function.atMostOne) {
  Object.defineProperty(Function, 'atMostOne', {
    value: atMostOne,
    writable: true,
    configurable: true,
  });
}
