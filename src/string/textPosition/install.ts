import { textPosition } from './index.js';
export type * from './types';

if (!String.prototype.textPosition) {
  Object.defineProperty(String.prototype, 'textPosition', {
    value(this: string, specifiedIndex?: number | undefined) {
      return textPosition(this, specifiedIndex);
    },
    writable: true,
    configurable: true,
  });
}
