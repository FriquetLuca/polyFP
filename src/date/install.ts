export * from './isDate/install';
export * from './isLeapYear/install';

import { installIsDate } from './isDate/install';
import { installIsLeapYear } from './isLeapYear/install';

export function installDateExtensions() {
  installIsDate();
  installIsLeapYear();
}
