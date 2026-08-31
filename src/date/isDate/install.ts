import { extendPrototype } from '../../utils.js';
import { isDate } from './index.js';
export type * from './types';

extendPrototype(Date, { isDate });
