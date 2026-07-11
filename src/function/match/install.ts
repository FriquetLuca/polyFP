import { match } from './index';
import './types';

if (!Function.match) {
  Object.defineProperty(Function, 'match', {
    value: match,
    writable: true,
    configurable: true,
  });
}
