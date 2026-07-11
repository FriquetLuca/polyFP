import { titleCase } from './index';
import './types';

export function installTitleCase() {
  if (!String.prototype.titleCase) {
    Object.defineProperty(String.prototype, 'titleCase', {
      value(this: string) {
        return titleCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
