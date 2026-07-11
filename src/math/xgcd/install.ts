import { xgcd } from './index';
import './types';

if (!Math.xgcd) {
  Object.defineProperty(Math, 'xgcd', {
    value: xgcd,
    writable: true,
    configurable: true,
  });
}
