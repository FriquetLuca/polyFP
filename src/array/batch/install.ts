import { extendPrototype } from '../../utils.js';
import { batch } from './index.js';
export type * from './types';

extendPrototype(Array, { batch });
