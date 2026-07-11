import { snakeCase } from './index';
import './types';

export function installSnakeCase() {
  if (!String.prototype.snakeCase) {
    Object.defineProperty(String.prototype, 'snakeCase', {
      value(this: string) {
        return snakeCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
