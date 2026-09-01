import { extendPrototype } from '../../utils.js';
import { invert } from './index.js';
export type * from './types';

extendPrototype(Object, { invert });
