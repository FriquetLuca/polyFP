import { uncurry } from './index';
import './types';

if (!Function.uncurry) {
  Object.defineProperty(Function, 'uncurry', {
    value: uncurry,
    writable: true,
    configurable: true,
  });
}
