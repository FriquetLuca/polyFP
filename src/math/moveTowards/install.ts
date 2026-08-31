import { extendPrototype } from '../../utils.js';
import { moveTowards } from './index.js';
export type * from './types';

extendPrototype(Math, { moveTowards });
