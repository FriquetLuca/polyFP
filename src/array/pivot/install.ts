import { extendPrototype } from '../../utils.js';
import { pivot } from './index.js';
export type * from './types';

extendPrototype(Array, { pivot });
