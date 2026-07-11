import { and } from './index';
import './types';

if (!Function.and) {
  Object.defineProperty(Function, 'and', {
    value: and,
    writable: true,
    configurable: true,
  });
}
