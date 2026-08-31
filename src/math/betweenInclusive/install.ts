import { extendPrototype } from '../../utils.js';
import { betweenInclusive } from './index.js';
export type * from './types';

extendPrototype(Math, { betweenInclusive });
